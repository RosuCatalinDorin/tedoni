<?php
error_reporting(E_ALL);
require_once('config.php');
session_start();

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

if($_GET['op']=='Deconectare'){

    $_SESSION['sesiuneUser'] = null;
    $_SESSION['nameUser'] =null;
    $_SESSION['nameUser'] = null;
    echo json_encode(array('status'=>'ok'));
}
if($_GET['op']=='login'){
try {
    $sql = "SELECT user_id FROM users WHERE email = :mail AND pass =:password";
    $sth = $dbh->prepare($sql);
    $poaram = array(':mail' => $_GET['mail'],
        ':password' => $_GET['password']);
    $sth->setFetchMode();
    $sth->execute($poaram);
    $id = $sth->fetchAll();

    $_SESSION['idUser'] =$id ;

    $sql = "SELECT last_name FROM users WHERE email = :mail AND pass =:password";
    $sth = $dbh->prepare($sql);
    $poaram = array(':mail' => $_GET['mail'],
                    ':password' => $_GET['password']);
    $sth->setFetchMode();
    $sth->execute($poaram);
    $yellow = $sth->fetchAll();

    $_SESSION['nameUser'] = $yellow;




    if  ($yellow==null){
        echo json_encode(array('status'=>'incorect'));
       $_SESSION['sesiune'] =null;

    }
    else
    {
        echo json_encode(array('status'=>'ok'));
        $param = $yellow[0]['last_name'];
        $_SESSION['nameUser'] = $param;
        $_SESSION['sesiuneUser'] = 'ok';

    }
} catch (PDOException $e) {

    echo json_encode(array('status'=>'err','err'=> handlePDOError('Eroare inserare cerere eliberare',$e)));

    exit;
}


}
if($_GET['op']=='checkMail'){
try {

    $sql = "SELECT email FROM users WHERE email = :mail";
    $sth = $dbh->prepare($sql);
    $poaram = array(':mail' => $_GET['mail_In']);
    $sth->setFetchMode();
    $sth->execute($poaram);
    $yellow = $sth->fetchAll();

    if  ($yellow==null){
        echo json_encode(array('status'=>'OK'));
    }
    else
    {
        echo json_encode(array('status'=>'EXISTA'));
    }
} catch (PDOException $e) {

    echo json_encode(array('status'=>'err','err'=> handlePDOError('Eroare inserare cerere eliberare',$e)));

    exit;
}


}
if($_GET['op']=='getCompanii'){

    try {

        $sql = "SELECT * FROM company";
        $sth = $dbh->prepare($sql);
        $sth->setFetchMode();
        $sth->execute();
        $yellow = $sth->fetchAll();
        echo json_encode($yellow,true);

    } catch (PDOException $e) {

        echo json_encode(array('status'=>'err','err'=> handlePDOError('Eroare inserare cerere eliberare',$e)));

        exit;
    }


}
if($_GET['op']=='getProgramari'){

    try {
            $id=15;
        $sql1 = "SELECT an as years FROM appointments where an =:p and company_id =:company";
        $sql2 = "SELECT * FROM appointments where luna =:p and company_id =:company";
        $sql3 = "SELECT * FROM appointments where zi =:p";
        $sth = $dbh->prepare($sql1);
        $sth->setFetchMode();
        $sth->execute(array(':p'=>'2017',
                            ':company'=>$id));
        $yellow = array();
        $yellow = $sth->fetch();


    $lunii = array();
            $JSON=array();
        for($i=1;$i<=12;$i++) {
            $sth = $dbh->prepare($sql2);
            $sth->setFetchMode();
            $sth->execute(array(':p'=>$i,
                ':company'=>$id));
            $yellow1 = array();
            $yellow1 = $sth->fetchAll();

            if($yellow1==null){

            }
            else{

                $lunii = $yellow1;

            }
        }

        $JSON =array('int'=>$yellow[0]) ;
    $JSON3 =    array('years'=>$JSON);

        echo '<pre>'.json_encode($JSON3,true).'</pre>';
        echo "<br>end";


    } catch (PDOException $e) {

        echo json_encode(array('status'=>'err','err'=> handlePDOError('Eroare inserare cerere eliberare',$e)));

        exit;
    }


}
if($_GET['op']=='getAppointments'){

    try {
        $sql1 = "SELECT ora, minu , status FROM `database`.appointments where date =:p_data and company_id =:company";
        $sth = $dbh->prepare($sql1);
        $sth->setFetchMode();
        $sth->execute(array(':p_data'=>$_GET['data'],
                            ':company'=>$_SESSION['id_company']));
        $yellow = array();
        $yellow = $sth->fetchAll();
        echo json_encode($yellow,true);


    } catch (PDOException $e) {

        echo json_encode(array('status'=>'err','err'=> handlePDOError('Eroare inserare cerere eliberare',$e)));

        exit;
    }


}
if($_GET['op']=='getDetaliiCompany'){

    try {

        $sql = "SELECT * FROM company WHERE company_id =:id ";
        $sth = $dbh->prepare($sql);
        $sth->setFetchMode();
        $sth->execute(array(
            ":id"=>$_SESSION['id_company']));
        $yellow = $sth->fetchAll();
        echo json_encode($yellow,true);

    } catch (PDOException $e) {

        echo json_encode(array('status'=>'err','err'=> handlePDOError('Eroare inserare cerere eliberare',$e)));

        exit;
    }


}
if($_GET['op']=='getServiceCompany'){

    try {

        $sql = "SELECT * FROM service WHERE company_id =:id ";
        $sth = $dbh->prepare($sql);
        $sth->setFetchMode();
        $sth->execute(array(
            ":id"=>$_SESSION['id_company']));
        $yellow = $sth->fetchAll();
        echo json_encode($yellow,true);

    } catch (PDOException $e) {

        echo json_encode(array('status'=>'err','err'=> handlePDOError('Eroare inserare cerere eliberare',$e)));

        exit;
    }


}
if($_GET['op']=='inregistrare'){


    try {
        $sql="INSERT INTO `users`(`first_name`,`last_name`,`phone`,`address`,`role`,`email`,`pass`)
                          VALUES (  :nume, :prenume, :phone, :adresa, 'user', :email, :password)";
        $stmt = $dbh->prepare($sql);
        //$stmt->setFetchMode(PDO::FETCH_ASSOC);
        $params=array(
            ":nume"=>$_GET['nume'],
            ":prenume"=>$_GET['prenume'],
            ":phone"=>$_GET['phone'],
            ":adresa"=>$_GET['adresa'],
            ":email"=>$_GET['mail'],
            ":password"=>$_GET['password']
        );
        $stmt->execute($params);

        echo json_encode(array('status'=>'OK'));

    }catch (PDOException $e) {

        echo json_encode(array('status'=>'err','err'=> handlePDOError('Eroare inserare cerere eliberare',$e)));

        exit;
    }


}
if($_GET['op']=='getSesion'){

    $yellow = $_SESSION['sesiuneUser'];
    echo json_encode($yellow,true);

}
if($_GET['op']=='getName'){

    $yellow = $_SESSION['nameUser'];

    echo json_encode($yellow,true);

}
if($_GET['op']=='getIdCompany'){

    $yellow = $_SESSION['id_company'];
    echo json_encode($yellow,true);

}


