<?php
/**
 * Created by PhpStorm.
 * User: Paul.Sas
 * Date: 06/09/2017
 * Time: 12:34 PM
 */
require_once('functions.php');
require_once('functions_pdo.php');
try {
    $ora_livia = new PDO('oci:dbname=dev01cj099:1521/devlvbt.bt.wan', 'test_dev', 'Test123$');
    $ora_livia->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_OBJ);
    $ora_livia->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $ora_livia->setAttribute(PDO::ATTR_AUTOCOMMIT,1);
} catch (PDOException $e) {
    echo  handlePDOError($e,"Eroare conectare la baza de date:");
    exit;
}
if(isset($fromFile) and isset($op) and $fromFile==true){
    if ($op=='login' ){
        $sql="select username from Utilizatori where username=:us";
        $user=get_request_user();
        try {
            $stmt = $dbh->prepare($sql);
            $stmt->setFetchMode(PDO::FETCH_ASSOC);
            $stmt->execute(array(":us"=>$user));
            $row = $stmt->fetch();
            if (!$row){
                echo json_encode(array('status'=>'OK','profile'=>-1,'user'=>$user));
            }
            else {
                require_once('_f_check_login.php');
                $u=get_ad_user_details($user);
                $_SESSION['EliberareID_user']=$user;
                $_SESSION['EliberareID_unit']=$row['branch'];
                $_SESSION['EliberareID_name']=$u[0]['nume'];
                $_SESSION['EliberareID_title']=$u[0]['functie'];
                $_SESSION['EliberareID_profile']=$row['profile'];
                $row['nume']=$u[0]['nume'];
                $row['functie']=$u[0]['functie'];
                switch ($row['profile']){
                    case 0:$row['nivelAcces']="Administrator";break;
                    case 1:$row['nivelAcces']="Supervizor";break;
                    case 2:$row['nivelAcces']="Utilizator";break;
                }
                $row['user']=$user;
                $row['status']='OK';
                echo json_encode($row);
            }


        } catch (PDOException $e) {
            echo json_encode(array('status'=>'err','err'=> handlePDOError($sql,$e)));
            exit;
        }
        exit();
    }


}
if ($_REQUEST['op']=='getMesaje') {
    $sql = "SELECT ma.ID_MSJ, ma.* FROM MESAJE_ACTIVE ma";
    try {
        $stmt = $ora_livia->prepare($sql);
        $stmt->execute();
        echo json_encode(pdo_to_grid($stmt,false));

    } catch (PDOException $e) {
        echo json_encode(array('status'=>'err','err'=> handlePDOError('Eroare obtinere statut client ',$e)));
        exit;
    }
    exit();



}
if ($_REQUEST['op']=='getMesajeInactive') {

    $sql = "SELECT * FROM MESAJE_INACTIVE ";
    try {
        $stmt = $ora_livia->prepare($sql);
        $stmt->execute();
        echo json_encode(pdo_to_grid($stmt,false,false));

    } catch (PDOException $e) {
        echo json_encode(array('status'=>'err','err'=> handlePDOError('Eroare obtinere statut client ',$e)));
        exit;
    }
    exit();

}
if ($_REQUEST['op']=='postMesaj') {
        try {

            $sql="SELECT COUNT(*)as CATE FROM MESAJE_ACTIVE WHERE (MESAJ = :MESAJ)";
            $stmt = $ora_livia->prepare($sql);
            $stmt->execute(array(":MESAJ"=>$_REQUEST['mesaj']));
            $rez=$stmt->fetch();
            //print_r($rez);
            if ($rez->CATE>0) {
                echo json_encode(array('status'=>'err','err'=>'MESAJ EXISTENT'));
                exit();
            }

            $sql="INSERT INTO MESAJE_ACTIVE(ID_MSJ,MESAJ,DATA_ACTIVARII,DESCRIERE,MAKER_ID,DATA_SCADENTA,FRECVENTA)
                 VALUES(  SEQUENCE_CIF.NEXTVAL , :mesaj_nou, systimestamp, :tip_msg, :maker,to_date(:data_scadenta ,'YYYY-MM-DD HH24:MI'),:scadenta)";

            $stmt = $ora_livia->prepare($sql);
            //$stmt->setFetchMode(PDO::FETCH_ASSOC);
            $params=array(
                ":mesaj_nou"=>$_REQUEST['mesaj'],
                ":tip_msg"=>$_REQUEST['tip_msg'],
                ":maker"=>$_REQUEST['maker'],
                ":data_scadenta"=>$_REQUEST['end_date'],
                ":scadenta"=>$_REQUEST['frecventa']


            );

            $stmt->execute($params);

            echo json_encode(array('status'=>'OK'));
        }catch (PDOException $e) {
            echo json_encode(array('status'=>'err','err'=> handlePDOError('Eroare inserare cerere eliberare',$e)));
            exit;
        }
        exit();

    }
if ($_REQUEST['op']=='editMesaj') {
// modificare mesaj
    try {

        $sql="SELECT DATA_ACTIVARII as DATA_ACTVARIIVAR FROM MESAJE_ACTIVE WHERE ( ID_MSJ =:id_msg)";
        $stmt = $ora_livia->prepare($sql);
        $stmt->execute(array(":id_msg"=>$_REQUEST['idmsg']));
        $rez=$stmt->fetch();


        $sql="SELECT MESAJ as MESAJ_ANTERIOR  FROM MESAJE_ACTIVE WHERE (ID_MSJ = :id_msg)";
        $stmt = $ora_livia->prepare($sql);
        $stmt->execute(array( ":id_msg"=>$_REQUEST['idmsg']));
        $rez1=$stmt->fetch();




    $sql="UPDATE  MESAJE_ACTIVE  SET  MESAJ = :mesaj_nou ,MAKER_ID =:maker , DATA_SCADENTA = to_date(:data_scadenta ,'YYYY-MM-DD HH24:MI'), DATA_MODIFICARI = systimestamp WHERE ID_MSJ =:id_msg";

    $stmt = $ora_livia->prepare($sql);
    //$stmt->setFetchMode(PDO::FETCH_ASSOC);
    $params=array(
        ":id_msg"=>$_REQUEST['idmsg'],
        ":mesaj_nou"=>$_REQUEST['mesaj'],
        ":maker"=>$_REQUEST['maker'],
        ":data_scadenta"=>$_REQUEST['start_date']
    );
    $stmt->execute($params);


        $sqlInactive="INSERT INTO MESAJE_INACTIVE(ID_MSJ,MESAJ,DATA_ON,DATA_OFF,MODIFIER_ID,STATUS)
  
       VALUES(:id_msg,:mesaj_anterior,:data_activ,systimestamp,:maker,'MODIFICAT')";
        $stmtInactive = $ora_livia->prepare($sqlInactive);
        $stmtInactive->execute(array(
            ":id_msg"=>$_REQUEST['idmsg'],
            ":maker"=>$_REQUEST['maker'],
            ":data_activ"=>$rez->DATA_ACTVARIIVAR,
            ":mesaj_anterior"=>$rez1->MESAJ_ANTERIOR));


    echo json_encode(array('status'=>'OK'));
}catch (PDOException $e) {
    echo json_encode(array('status'=>'err','err'=> handlePDOError('Eroare editare mesaj',$e)));
    exit;
}
// inserare mesajul anterior



}
if ($_REQUEST['op']=='delMesaj') {
// sterge  mesaj
    try {
        $ora_livia->beginTransaction();

        $sqlInactive="
      
      
      INSERT INTO MESAJE_INACTIVE (  ID_MSJ , MESAJ , DATA_ON  , MODIFIER_ID , STATUS) 

      SELECT ID_MSJ , MESAJ , DATA_ACTIVARII  , :maker , 'STERS'
   
      FROM MESAJE_ACTIVE 
      
        WHERE ID_MSJ =:id_msg ";




        $stmtInactive = $ora_livia->prepare($sqlInactive);
        $stmtInactive->execute(array(
            ":id_msg"=>$_REQUEST['idmsgdel'],
            ":maker"=>$_REQUEST['maker']
        ));

        $sql="DELETE FROM MESAJE_ACTIVE  WHERE ID_MSJ =:id_msg";

        $stmt = $ora_livia->prepare($sql);
        //$stmt->setFetchMode(PDO::FETCH_ASSOC);
        $params=array(
            ":id_msg"=>$_REQUEST['idmsgdel'],
        );
        $stmt->execute($params);




        $ora_livia->commit();
        echo json_encode(array('status'=>'OK'));
    }catch (PDOException $e) {
        $ora_livia->rollback();
        echo json_encode(array('status'=>'err','err'=> handlePDOError('Eroare editare mesaj',$e)));
        exit;
    }
// inserare mesajul anterior



}
if ($_REQUEST['op']=='sendSMS') {
// sterge  mesaj
    try {
        $sql="BEGIN STPKS_TRIMITERE_MESAJE.MESAJ_ZI_NASTERE(:descriere);END; ";
        $stmt = $ora_livia->prepare($sql);
        //$stmt->setFetchMode(PDO::FETCH_ASSOC);
        $params=array(
            ":descriere"=>'zi de nastere'
        );
        $stmt->execute($params);

        echo json_encode(array('status'=>'OK'));
    }catch (PDOException $e) {
        $ora_livia->rollback();
        echo json_encode(array('status'=>'err','err'=> handlePDOError('Eroare editare mesaj',$e)));
        exit;
    }
// inserare mesajul anterior



}
if ($_REQUEST['op']=='getSendSMS') {
    $sql = "SELECT ma.CIF, ma.* FROM MESAJE_ZILNICE ma";
    try {
        $stmt = $ora_livia->prepare($sql);
        $stmt->execute();
        echo json_encode(pdo_to_grid($stmt,false));

    } catch (PDOException $e) {
        echo json_encode(array('status'=>'err','err'=> handlePDOError('Eroare obtinere statut client ',$e)));
        exit;
    }
    exit();



}
if ($_REQUEST['op']=='test') {

                //get sarbatori
    $sql = "SELECT * FROM SARBATORI_NUME WHERE DATA_S = :data_event ";
    try {
        $stmt = $ora_livia->prepare($sql);
        $params=array(
            ":data_event"=>$_REQUEST['end_date']
        );
        $stmt->execute($params);
        echo json_encode(pdo_to_grid($stmt,false,false));

    } catch (PDOException $e) {
        echo json_encode(array('status'=>'err','err'=> handlePDOError('Eroare obtinere statut client ',$e)));
        exit;
    }



}
if ($_REQUEST['op']=='VerEvent') {

    $sql = "SELECT * FROM SARBATORI_NUME WHERE DATA_S =:data_event ";
    try {
        $stmt = $ora_livia->prepare($sql);
        $params=array(
            ":data_event"=>$_REQUEST['data']
        );
        $stmt->execute($params);
       /* $rez1=$stmt->fetch();*/
        echo json_encode(pdo_to_grid($stmt,false,false));

    } catch (PDOException $e) {
        echo json_encode(array('status'=>'err','err'=> handlePDOError('Eroare obtinere statut client ',$e)));
        exit;
    }
    exit();

}
if ($_REQUEST['op']=='InsertEvent') {

    $sql = "INSERT INTO SARBATORI_NUME (DATA_S,NUME_S, MAKER_ID, DATA_CREATE_EVENT) VALUES (:data_event ,UPPER(:addpren ||'~'),:maker,systimestamp)";
    try {
        $stmt = $ora_livia->prepare($sql);
        $params1=array(
            ":data_event"=>$_REQUEST['data'],
            ":addpren"=>$_REQUEST['value'] ,
            ":maker"=>$_REQUEST['maker']
        );
        $stmt->execute($params1);

        echo json_encode(array('status'=>'OK'));

    } catch (PDOException $e) {
        echo json_encode(array('status'=>'err','err'=> handlePDOError('Eroare adaugare event  ',$e)));
        exit;
    }
    exit();

}
if ($_REQUEST['op']=='UpdateEvent') {

        try {

        $sql = "UPDATE SARBATORI_NUME  SET NUME_S =UPPER( (SELECT  NUME_S   || :addpren  FROM SARBATORI_NUME WHERE DATA_S =:data_event) ) || '~', MAKER_ID =:maker, DATA_CREATE_EVENT = systimestamp WHERE (DATA_S = :data_event)";

        $stmt = $ora_livia->prepare($sql);
        $params1=array(
            ":data_event"=>$_REQUEST['data'],
            ":addpren"=>$_REQUEST['value'] ,
            ":maker"=>$_REQUEST['maker']
        );
        $stmt->execute($params1);

        echo json_encode(array('status'=>'OK'));

    } catch (PDOException $e) {
        echo json_encode(array('status'=>'err','err'=> handlePDOError('Eroare adaugare event  ',$e)));
        exit;
    }
    exit();

}
?>


