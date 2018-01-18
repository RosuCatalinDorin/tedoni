<?php
/**
 * Created by PhpStorm.
 * User: Paul.Sas
 * Date: 03/09/2017
 * Time: 5:56 PM
 */

require_once ('functions.php');

$json = file_get_contents('php://input');
$obj = json_decode($json);

// SQL GET //
require_once('functions_pdo.php');
require_once ('_f_check_login.php');
try {
    $dbh = new PDO ("sqlsrv:Server=".Idebit.",".Idebit_PORT.";Database=".Idebit_DB,Idebit_USER,Idebit_PASS);
    $dbh->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_OBJ);
    $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo  pdo_error_heandler($e,"Eroare conectare la baza de date:");
    exit;
}

if ($obj->OP=='requestID'){
        $sql="exec v2_cerere_eliberare 
            @idClient=:CUSTOMER_NO,
            @numeClient=:CUTOMER_NAME1 ,
            @tel_cont=:TEL_CONTACT ,
            @cui=:SHORT_NAME ,
            @cec=:FILE_CEC ,
            @bo=:FILE_BO ,
            @camb=:FILE_CAMBIE ,
            @orn=:FILE_ORN ,
            @branch=:BRANCH ,
            @solicitant=:REPREZENTANT_NAME ,
            @cnp_solicitant=:REPREZENTANT_CNP ,
            @cont=:CONT ,
            @iban=:IBAN ,
            @addby=:addby ,
            @addip=:addip ,
            @addstatie=:addstatie";
    try {
        $stmt = $dbh->prepare($sql);
        $stmt->setFetchMode(PDO::FETCH_ASSOC);
        $params=array(
            ":CUSTOMER_NO"=>$obj->CUSTOMER_NO,
            ":CUTOMER_NAME1"=>$obj->CUTOMER_NAME1,
            ":TEL_CONTACT"=>$obj->TEL_CONTACT,
            ":SHORT_NAME"=>$obj->SHORT_NAME,
            ":FILE_CEC"=>$obj->FILE_CEC,
            ":FILE_BO"=>$obj->FILE_BO,
            ":FILE_CAMBIE"=>$obj->FILE_CAMBIE,
            ":FILE_ORN"=>$obj->FILE_ORN,
            ":BRANCH"=>$obj->BRANCH,
            ":REPREZENTANT_NAME"=>$obj->REPREZENTANT_NAME,
            ":REPREZENTANT_CNP"=>$obj->REPREZENTANT_CNP,
            ":CONT"=>$obj->CONT,
            ":IBAN"=>$obj->IBAN,
            ":addby"=>get_user(),
            ":addip"=>get_ip(),
            ":addstatie"=>get_statie()
            );
        $stmt->execute($params);
        $rows = $stmt->fetchAll();
        if ($rows) $rows=$rows[0];
        if ($rows['IdCerere'] > 0 ) echo json_encode(array('status'=>'OK','IdCerere'=> $rows['IdCerere']));
        else echo json_encode(array('status'=>'err','err'=> $rows['ErrorMessage']));

        require_once ('load_ora.php');



    }catch (PDOException $e) {
        echo json_encode(array('status'=>'err','err'=> handlePDOError('Eroare inserare cerere eliberare',$e)));
        exit;
    }
    exit();


}

if ($obj->OP=='aprobID'){
    $sql="exec v2_aprobare_cerere 
              @idcerere=:REQUEST_ID,
              @FILE_CEC=:FILE_CEC_APROVE,
              @FILE_CAMBIE=:FILE_CAMBIE_APROVE,
              @FILE_BO=:FILE_BO_APROVE,
              @FILE_ORN=:FILE_ORN_APROVE,
              @nr_cip=:CIP_LAST_RESPONSE_NUMBER ,
              @cip_cec_major=:FILE_CEC_CIP_MAJOR,
              @cip_bo_major=:FILE_BO_CIP_MAJOR,
              @cip_cambie_major=:FILE_CB_CIP_MAJOR,
              @cip_cec_minor=:FILE_CEC_CIP_MINOR,
              @cip_bo_minor=:FILE_BO_CIP_MINOR,
              @cip_cambie_minor=:FILE_CB_CIP_MINOR,
              @motiv=:APPROVE_DETAILS,
              @addby=:addby,
              @addstatie=:addstatie,
              @addip=:addip";
    try {
        $stmt = $dbh->prepare($sql);
        $stmt->setFetchMode(PDO::FETCH_ASSOC);
        $params=array(
            ":REQUEST_ID"=>$obj->REQUEST_ID,
            ":FILE_CEC_APROVE"=>$obj->FILE_CEC_APROVE,
            ":FILE_CAMBIE_APROVE"=>$obj->FILE_CAMBIE_APROVE,
            ":FILE_BO_APROVE"=>$obj->FILE_BO_APROVE,
            ":FILE_ORN_APROVE"=>$obj->FILE_ORN_APROVE,
            ":CIP_LAST_RESPONSE_NUMBER"=>$obj->CIP_LAST_RESPONSE_NUMBER,
            ":FILE_CEC_CIP_MAJOR"=>$obj->FILE_CEC_CIP_MAJOR,
            ":FILE_BO_CIP_MAJOR"=>$obj->FILE_BO_CIP_MAJOR,
            ":FILE_CB_CIP_MAJOR"=>$obj->FILE_CB_CIP_MAJOR,
            ":FILE_CEC_CIP_MINOR"=>$obj->FILE_CEC_CIP_MINOR,
            ":FILE_BO_CIP_MINOR"=>$obj->FILE_BO_CIP_MINOR,
            ":FILE_CB_CIP_MINOR"=>$obj->FILE_CB_CIP_MINOR,
            ":APPROVE_DETAILS"=>$obj->APPROVE_DETAILS,
            ":addby"=>get_user(),
            ":addip"=>get_ip(),
            ":addstatie"=>get_statie()
        );
        //print_r($params);
        $stmt->execute($params);
        $rows = $stmt->fetchAll();
        echo json_encode($rows[0]);


    }catch (PDOException $e) {
        echo json_encode(array('status'=>'err','err'=> handlePDOError('Eroare inserare cerere eliberare',$e)));
        exit;
    }
    exit();


}
if ($obj->OP=='validateRangeID'){
    $sql="exec v2_validateRangeRequest 
              @idcerere=:REQUEST_ID,
              @addby=:addby,
              @addstatie=:addstatie,
              @addip=:addip";
    try {
        $stmt = $dbh->prepare($sql);
        $stmt->setFetchMode(PDO::FETCH_ASSOC);
        $params=array(
            ":REQUEST_ID"=>$obj->REQUEST_ID,
            ":addby"=>get_user(),
            ":addip"=>get_ip(),
            ":addstatie"=>get_statie()
        );
        //print_r($params);
        $stmt->execute($params);
        $rows = $stmt->fetchAll();
        echo json_encode($rows[0]);


    }catch (PDOException $e) {
        echo json_encode(array('status'=>'err','err'=> handlePDOError('Eroare salvare confirmare plaje',$e)));
        exit;
    }
    exit();


}
if ($obj->OP=='markNotPrinted'){


    $in  = str_repeat('?,', count($obj->rows_not_printed) - 1) . '?';


    try {

        $dbh->beginTransaction();
        $create_req_stop=false;

        $sql0 = "update idebit_file set printed=0,stare='Rezervat' where idcerere=? and  Serie+nr in ($in)";
        $stmt = $dbh->prepare($sql0);
        $params=array_merge([$obj->reqId],$obj->rows_not_printed);
        $stmt->execute($params);

        $sql1="DELETE from  Idebit_file_stopate where idCerereEliberare = ? and serie+cast(nr as VARCHAR(20)) in ($in)";
        $stmt = $dbh->prepare($sql1);
        $stmt->execute($params);

        $sql2 = "select Serie+nr as id,case when printed=1 and stare='Rezervat' then 'Tiparit' WHEN  stare='Rezervat' and printed=0 THEN 'Asteapta tiparire' else  stare end as stare,printed from idebit_file where idcerere=? and Serie+nr in ($in)";
        $stmt1 = $dbh->prepare($sql2);
        $stmt1->execute($params);
        $rows = $stmt1->fetchAll();

        $dbh->commit();
        echo json_encode(array('status'=>'OK','rows'=>$rows));


    }catch (PDOException $e) {
        $dbh->rollBack();
        echo json_encode(array('status'=>'err','err'=> handlePDOError('Eroare marcare file netiparite',$e)));
        exit;
    }
    exit();


}
if ($obj->OP=='markStoparePrintedErr'){

    
    $in  = str_repeat('?,', count($obj->rows_not_printed) - 1) . '?';

    try {
        $dbh->beginTransaction();
        $create_req_stop=false;
        //verific daca exista deja o cerere de stopare
        $sql="select top 1 idcerere idcerere_stopare from idebit_cereri_stopare where idCerereEliberare=? order by idcerere desc";
        $stmt = $dbh->prepare($sql);
        $params=array($obj->reqId);
        $stmt->execute($params);
        $rows=$stmt->fetchAll();
        if ($rows) $idcerere_stopare=$rows[0];
        else {
            $sql="SET NOCOUNT ON; insert into idebit_cereri_stopare(create_by, solicitnat, branch, motiv, idCerereEliberare)values(?,'BANCA TRANSILVANIA',?,'pretiparire eronata',?); SELECT @@IDENTITY as idcerere_stopare";
            $stmt = $dbh->prepare($sql);
            $params=array(get_user(),get_user_unit(),$obj->reqId);
            $stmt->execute($params);
            $rows=$stmt->fetchAll();
            $idcerere_stopare=$rows[0];
            $create_req_stop=true;
        }
        $idcerere_stopare=$idcerere_stopare->idcerere_stopare;

        $sql0 = "update idebit_file set printed=1,stare='Stopat' where idcerere=? and stare='Rezervat' and Serie+nr in ($in)";

        $stmt = $dbh->prepare($sql0);
        $params=array_merge([$obj->reqId],$obj->rows_not_printed);
        $stmt->execute($params);

        $sql1="INSERT INTO Idebit_file_stopate(addby, addtime, tip_fila, serie, nr, motiv, client, iban, idcerere, ci, cod_fiscal, cods,codu,  Branch, cont,idCerereEliberare)
    select ?,replace(convert(VARCHAR(20), getDate(), 120), '-', '/'),case substring(Serie,5,1) WHEN '1' then 'cec' when '2' THEN 'cambie' WHEN '3' then 'bo' WHEN '4' THEN 'orn' end,Serie,nr,'pretiparire eronata',nume_client,iban,?,'',cod_fiscal,cods,coda,?,cont,?
    from idebit_file  where idcerere=? and Serie+nr in ($in)";
        $stmt = $dbh->prepare($sql1);
        $params1=array(get_user(),$idcerere_stopare,get_user_unit(),$obj->reqId,$obj->reqId);
        $params1=array_merge($params1,$obj->rows_not_printed);
        //print_r($params1);
        $stmt->execute($params1);


        $sql2 = "select Serie+nr as id,case when printed=1 and stare='Rezervat' then 'Tiparit' WHEN  stare='Rezervat' and printed=0 THEN 'Asteapta tiparire'  when stare='Stopat' then 'Stopat - Tiparire eronata' else  stare end as stare,printed from idebit_file where idcerere=? and stare='Stopat' and Serie+nr in ($in)";
        $stmt1 = $dbh->prepare($sql2);
        $stmt1->execute($params);
        $rows = $stmt1->fetchAll();

        $dbh->commit();
        echo json_encode(array('status'=>'OK','idcerere_stopare'=>$idcerere_stopare,'create_req_stop'=>$create_req_stop,'rows'=>$rows));


    }catch (PDOException $e) {
        $dbh->rollBack();
        echo json_encode(array('status'=>'err','err'=> handlePDOError('Eroare marcare file netiparite',$e)));
        exit;
    }
    exit();


}
if ($obj->OP=='markPrintedOk'){


    $in  = str_repeat('?,', count($obj->rows_printed_ok) - 1) . '?';

    try {
        $dbh->beginTransaction();
        $create_req_stop=false;

        $sql0 = "update idebit_file set printed=1,stare='Rezervat' where idcerere=?  and Serie+nr in ($in)";
        $stmt = $dbh->prepare($sql0);
        $params=array_merge([$obj->reqId],$obj->rows_printed_ok);
        $stmt->execute($params);

        $sql1="DELETE from  Idebit_file_stopate where idCerereEliberare = ? and serie+cast(nr as VARCHAR(20)) in ($in)";
        $stmt = $dbh->prepare($sql1);
        $stmt->execute($params);


        $sql2 = "select Serie+nr as id,case when printed=1 and stare='Rezervat' then 'Tiparit' WHEN  stare='Rezervat' and printed=0 THEN 'Asteapta tiparire' else  stare end as stare,printed from idebit_file where idcerere=? and Serie+nr in ($in)";
        $stmt1 = $dbh->prepare($sql2);
        $stmt1->execute($params);
        $rows = $stmt1->fetchAll();

        $dbh->commit();
        echo json_encode(array('status'=>'OK','rows'=>$rows));


    }catch (PDOException $e) {
        $dbh->rollBack();
        echo json_encode(array('status'=>'err','err'=> handlePDOError('Eroare marcare file netiparite',$e)));
        exit;
    }
    exit();


}
if ($obj->OP=="completePrinted"){
    $sql="exec v2_completPrint 
              @idcerere=:REQUEST_ID,
              @addby=:addby,
              @addstatie=:addstatie,
              @addip=:addip";
    try {
        $stmt = $dbh->prepare($sql);
        $stmt->setFetchMode(PDO::FETCH_ASSOC);
        $params=array(
            ":REQUEST_ID"=>$obj->reqId,
            ":addby"=>get_user(),
            ":addip"=>get_ip(),
            ":addstatie"=>get_statie()
        );
        //print_r($params);
        $stmt->execute($params);
        $rows = $stmt->fetchAll();
        echo json_encode($rows[0]);


    }catch (PDOException $e) {
        echo json_encode(array('status'=>'err','err'=> handlePDOError('',$e)));
        exit;
    }
    exit();


}

//echo '<pre>'. print_r($request, true).'</pre>';