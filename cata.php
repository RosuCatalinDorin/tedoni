
<?php

/**
 * Created by PhpStorm.
 * User: rosuc
 * Date: 1/7/2018
 * Time: 4:21 PM
 */

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
$_SESSION['id_company'] = 15;
try {

    $sql = "SELECT * FROM appointments WHERE company_id =:id ";
    $sth = $dbh->prepare($sql);
    $sth->setFetchMode();
    $sth->execute(array(
        ":id"=>$_SESSION['id_company']));
    $result = $sth->fetchAll();






} catch (PDOException $e) {

    echo json_encode(array('status'=>'err','err'=> handlePDOError('Eroare inserare cerere eliberare',$e)));

    exit;
}