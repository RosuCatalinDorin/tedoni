<?php
include_once('nusoap.php');

/*
$username = 'username@example.com';
$password = 'password';
$endpoint = 'http://your.local.version/of/Services.wsdl';
 */
$username = 'bt\\ce.test1';
$password = 'CE@1234!1';
$endpoint  = 'http://ce.bt.wan:1000/sites/mainsite/_vti_bin/BT.iQuest.ClientEnrollment/SignatureClient.svc/web/GetPF/2100317';


$wsdl = true;
$soapclient = new nusoap_client($endpoint, $wsdl);

$soapclient->setCredentials($username, $password, 'ntlm');

$xml  = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><soap:Body><GetPF xmlns="http://tempuri.org/"><cif>2100317</cif></GetPF></soap:Body></soap:Envelope>';

    $operation = 'GetPF';
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

?>