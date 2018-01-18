<?php
include('nusoap.php');
echo 'aaaa';
 error_reporting(E_ALL);
/*
$param=array(
        'Body'=>array(
        'GetPF'=>array(
            'cif'=>'2100317'
        )),
    'http://ce.bt.wan:1000/sites/mainsite/_vti_bin/BT.iQuest.ClientEnrollment');

$username = 'user@example.com';
$password = 'password';
$ews_url  = 'https://owa.example.com/ews/Services.wsdl';

$username = 'bt\\ce.test1';
$password = 'CE@1234!1';
$ews_url  = 'http://ce.bt.wan:1000/sites/mainsite/_vti_bin/BT.iQuest.ClientEnrollment/SignatureClient.svc?wsdl';
*/
$username = 'bt\\ce.test1';
$password = 'CE@1234!1';
$ews_url  = 'http://ce.bt.wan:1000/sites/mainsite/_vti_bin/BT.iQuest.ClientEnrollment/SignatureClient.svc?wsdl';
$soapclient = new nusoap_client($service, true);
$err = $soapclient->getError();
if($err){
    die('Error: '.$err);
}
$soapclient->setCredentials($username, $password, 'ntlm');
//   $soapclient->setCredentials('', '', 'ntlm');
//    $soapclient->setUseCurl(true);
//   $soapclient->useHTTPPersistentConnection();
//   $soapclient->setCurlOption(CURLOPT_HTTPAUTH, CURLAUTH_NTLM);
//   $soapclient->setCurlOption(CURLOPT_SSL_VERIFYPEER, 0);
//   $soapclient->setCurlOption(CURLOPT_RETURNTRANSFER, 1);
//   $soapclient->setCurlOption(CURLOPT_USERPWD, $username.':'.$password);
$soapclient->soap_defencoding = 'UTF-8';
echo $proxy = $soapclient->getProxy();
echo '<pre>'; echo htmlspecialchars($soapclient->debug_str, ENT_QUOTES); echo '</pre>';
if($err){
    die('Error: '.$err);
}
$xml  = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><soap:Body><GetPF xmlns="http://tempuri.org/"><cif>2100317</cif></GetPF></soap:Body></soap:Envelope>';

$operation = 'GetPF';
echo '<u>OPPERATION CALL</u><br/><br/>';
$result = $soapclient->call($operation, $xml);
echo '<pre>'; print_r($result); echo '</pre>';

if($soapclient->fault){
    echo 'FAULT: ';
    echo '<pre>'; print_r($result); echo '</pre>';
}else{
    $err = $soapclient->getError();
    if ($err) {
        echo '<p><b><u>Error</u>:</b><br />' . $err . '</p>';
    }else{
        echo 'Connection succeeded.';
    }
}