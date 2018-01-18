<?php

error_reporting(E_ALL);
require_once('functions.php');

require_once('functions_pdo.php');
require_once('config.php');
$hostname = host;
$username = name;
$password = password;
$namedb = namedb;

$mail;
$password;
$idusers;


try {
    $dbh = new PDO("mysql:host=$hostname;dbname=".namedb, $username, $password);
    $dbh->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_OBJ);
    $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo  pdo_error_heandler($e,"Eroare conectare la baza de date:");
    exit;
}

$json = file_get_contents('php://input');
$obj = json_decode($json);

if ($obj->op == 'login') {

    if($obj->tabela == 'users')
    {


        $sql1 = "SELECT user_id FROM users WHERE email =:mail";
        $poaram1 = array(':mail' => $_SESSION['email']);
        $sth = $dbh->prepare($sql1);
        $sth->setFetchMode();
        $sth->execute($poaram1);
        $rez = $sth->fetchAll();
        $param = $rez[0]['employee_id'];
        $_SESSION['id'] = $param;

        $sql = "SELECT * FROM users WHERE email = :mail AND pass =:password";
        $sth = $dbh->prepare($sql);
        $poaram = array(':mail' => $obj->mail,
            ':password' => $obj->pass);
        $sth->execute($poaram);
        $yellow = $sth->fetchAll();
        if  ($yellow==null)
            echo json_encode(array('status'=>'user incorect'));
        else
            echo json_encode(array('status'=>'ok'));
                 $_SESSION['sesiune'] = 'ok';
    }

    if($obj->tabela == 'company')
    {
            $_SESSION['email']= $obj->mail;
            $sql1 = "SELECT company_id FROM company WHERE email =:mail";
            $poaram1 = array(':mail' => $_SESSION['email']);
            $sth = $dbh->prepare($sql1);
            $sth->setFetchMode();
            $sth->execute($poaram1);
            $rez = $sth->fetchAll();
            $param = $rez[0]['company_id'];
            $_SESSION['id']=$param;

        $sql = "SELECT * FROM company WHERE email = :mail AND pass =:password";
        $sth = $dbh->prepare($sql);
        $poaram = array(':mail' => $obj->mail,
            ':password' => $obj->pass);
        $sth->execute($poaram);
        $yellow = $sth->fetchAll();
        if  ($yellow==null)
            echo json_encode(array('status'=>'user incorect'));
        else
            echo json_encode(array('status'=>'ok'));
        $_SESSION['sesiune'] = 'ok';
    }

    if($obj->tabela == 'employees')
    {
        $_SESSION['email'] = $obj->mail;

        $sql11 = "SELECT employee_id FROM employees WHERE email =:mail";
        $poaram1 = array(':mail' => $_SESSION['email']);
        $sth = $dbh->prepare($sql11);
        $sth->setFetchMode();
        $sth->execute($poaram1);
        $rez = $sth->fetchAll();
        $param = $rez[0]['employee_id'];
        $_SESSION['id'] = $param;


        $sql = "SELECT * FROM employees WHERE email = :mail AND pass =:password";
        $sth = $dbh->prepare($sql);
        $poaram = array(':mail' => $obj->mail,
            ':password' => $obj->pass);
        $sth->execute($poaram);
        $yellow = $sth->fetchAll();
        if  ($yellow==null)
            echo json_encode(array('status'=>'user incorect'));
        else
            echo json_encode(array('status'=>'ok'));

        $_SESSION['sesiune'] = 'ok';

}




}
if ($obj->op == 'usersdate') {

    $_SESSION['email'] = $obj->mail;
    $password = $obj->pass;
    $_SESSION['type'] =  $obj->tabela;

    echo json_encode(array('id'=>$idusers,'pass'=>$password,'mail'=>$mail));

}
if ($obj->op == 'postProgramareCompany') {


try {
    $sql="INSERT INTO `appointments` ( `time`, `date`, `user_id`, `price`, `company_id`, `employee_id`, `status`, `type`, `email`, `telefon_client`, `maker`, `nume`)

           VALUES ( :ora, :date1, '', :suma, :id_companie, :id_angajat, :status_p, :tipe, :mail, :telefon_client, 'Compania', :nume)";
    $stmt = $dbh->prepare($sql);
    //$stmt->setFetchMode(PDO::FETCH_ASSOC);
    $params=array(
        ":ora"=>$obj->ora,
        ":date1"=>$obj->data,
        ":suma"=>$obj->suma,
        ":id_companie"=>$_SESSION['id'],
        ":tipe"=>$obj->tipe,
        ":id_angajat"=>$obj->id_angajat,
        ":telefon_client"=>$obj->telefon,
        ":nume"=>$obj->numeClient,
        ":mail"=>"null",
        ":status_p"=>"NEC"
    );

    $stmt->execute($params);

    echo json_encode(array('status'=>'OK'));
}catch (PDOException $e) {

    echo json_encode(array('status'=>'err','err'=> handlePDOError('Eroare inserare cerere eliberare',$e)));

    exit;
}


}
if ($obj->op == 'createAngajat') {


try {
    $sql="INSERT INTO `employees` ( `first_name`, `last_name`, `phone`, `address`, `type`, `details`, `company_id`, `email`, `pass`)

           VALUES ( :nume, :prenume, :telefon, :adresa, :functie, :detalii, :id_companie, :mail,:pass)";
    $stmt = $dbh->prepare($sql);
    //$stmt->setFetchMode(PDO::FETCH_ASSOC);
    $params=array(
        ":nume"=>$obj->nume,
        ":prenume"=>$obj->prenume,
        ":telefon"=>$obj->telefon,
        ":id_companie"=>$_SESSION['id'],
        ":adresa"=>$obj->adresa,
        ":functie"=>$obj->functie,
        ":mail"=>$obj->mail,
        ":detalii"=>$obj->detalii,
        ":pass"=>"1234"
    );

    $stmt->execute($params);

    echo json_encode(array('status'=>'OK'));
}catch (PDOException $e) {

    echo json_encode(array('status'=>'err','err'=> handlePDOError('Eroare inserare cerere eliberare',$e)));

    exit;
}


}
if ($obj->op == 'postServiceCompani') {


try {
    $sql="INSERT INTO `service` ( `type`, `company_id`, `description`, `price`,`img`)

                        VALUES ( :nume, :id_companie, :description, :price, :img)";
    $stmt = $dbh->prepare($sql);
    //$stmt->setFetchMode(PDO::FETCH_ASSOC);
    $params=array(
        ":nume"=>$obj->nume,
        ":id_companie"=>$_SESSION['id'],
        ":description"=>$obj->description,
        ":price"=>$obj->pret,
        ":img"=>'images/program-img2.jpg'
    );

    $stmt->execute($params);

    echo json_encode(array('status'=>'OK'));
}catch (PDOException $e) {

    echo json_encode(array('status'=>'err','err'=> handlePDOError('Eroare inserare cerere eliberare',$e)));

    exit;
}


}
if ($_GET['op']=='sesiune' ){


     echo json_encode(array('status'=>$_SESSION['sesiune']));

}
if ($_GET['op']=='ofsesion' ) {

    $_SESSION['sesiune']='of';
    $_SESSION['email'] = null;
    $_SESSION['type']= null;

    echo json_encode(array('status'=>$_SESSION['sesiune']));

}
if ($_GET['op']=='getProgramri' ){

    if( $_SESSION['type']=='company') {

        $sql = "SELECT * FROM appointments WHERE company_id =:id";

        try {

            $poaram = array(':id' =>$_SESSION['id']);
            $sth = $dbh->prepare($sql);
            $sth->execute($poaram);
            echo json_encode(pdo_to_grid($sth,false,false));


        } catch (PDOException $e) {
            echo json_encode(array('status'=>'err','err'=> handlePDOError('Eroare obtinere statut client ',$e)));
            exit;
        }
        exit();}

        if( $_SESSION['type']=='employees'){
            $sql1 = "SELECT employee_id FROM employees WHERE email =:mail";

            $sql = "SELECT * FROM appointments WHERE employee_id =:id_emp";

            try {

                $poaram1 = array(':mail' => $_SESSION['email']);
                $sth = $dbh->prepare($sql1);
                $sth->setFetchMode();
                $sth->execute($poaram1);
                $rez = $sth->fetchAll();
            //   echo json_encode($rez[0][employee_id]) ;

               $param = $rez[0]['employee_id'];
                //echo json_encode(pdo_to_grid($sth,false,false));


                $poaram = array(':id_emp'=>$param);
                $sth = $dbh->prepare($sql);
                $sth->execute($poaram);
              echo json_encode(pdo_to_grid($sth,false,false));


            } catch (PDOException $e) {
                echo json_encode(array('status'=>'err','err'=> handlePDOError('Eroare obtinere statut client ',$e)));
                exit;
            }
            exit();

        }
            if( $_SESSION['type']=='users') {


                $sql1 = "SELECT user_id FROM users WHERE email =:mail";

                $sql = "SELECT * FROM appointments WHERE user_id =:id_emp";

                try {

                    $poaram1 = array(':mail' => $_SESSION['email']);
                    $sth = $dbh->prepare($sql1);
                    $sth->setFetchMode();
                    $sth->execute($poaram1);
                    $rez = $sth->fetchAll();
                  //     echo json_encode($rez[0][user_id]) ;

                      $param = $rez[0]['user_id'];
                   // echo json_encode(pdo_to_grid($sth,false,false));


                    $poaram = array(':id_emp'=>$param);
                    $sth = $dbh->prepare($sql);
                    $sth->execute($poaram);
                    echo json_encode(pdo_to_grid($sth,false,false));


                } catch (PDOException $e) {
                    echo json_encode(array('status'=>'err','err'=> handlePDOError('Eroare obtinere statut client ',$e)));
                    exit;
                }
                exit();
            }

}
if ($_GET['op']=='getAngajati' ){


        $sql = "SELECT company_id as id FROM company WHERE email =:mail";


        try {


            $stmt = $dbh->prepare($sql);
            $stmt->setFetchMode(PDO::FETCH_ASSOC);
            $poaram = array(':mail' => $_SESSION['email']);
            $stmt->execute($poaram);
            $rez = $stmt->fetch();
             $idCompanie = $rez['id'];

            $sql2 = "SELECT * FROM employees WHERE company_id =:id";
            $poaram2 = array(':id' => $idCompanie);
            $sth = $dbh->prepare($sql2);
            $sth->execute($poaram2);
           echo json_encode(pdo_to_grid($sth,false,false));




        } catch (PDOException $e) {
            echo json_encode(array('status'=>'err','err'=> handlePDOError('Eroare obtinere statut client ',$e)));
            exit;
        }
        exit();


}
if ($_GET['op']=='getService' ){

        try {


            $sql2 = "SELECT * FROM service WHERE company_id =:id";
            $poaram2 = array(':id' => $_SESSION['id']);
            $sth = $dbh->prepare($sql2);
            $sth->execute($poaram2);
           echo json_encode(pdo_to_grid($sth,false,false));




        } catch (PDOException $e) {
            echo json_encode(array('status'=>'err','err'=> handlePDOError('Eroare obtinere statut client ',$e)));
            exit;
        }
        exit();


}

//echo '<pre>'. print_r($request, true).'</pre>';