<?php
//echo 'aaaaaa';
  //require_once("nusoap.php");
  include('WS.php');

  $ns="http://web01cj001/";
  $server = new soap_server();
  $server->configureWSDL('Flex',$ns);
  $server->wsdl->schemaTargetNamespace=$ns;
  $server->wsdl->addComplexType('client_data_struct','complexType','struct','all','',

  array('Val'=>array(
    'Nume_client',//=>'xsd:string',
    'Tip_client',//=>'xsd:string',
    'cnp_cui',//=>'xsd:string',
    'reg_comert',//=>'xsd:string',
    'Cust_adress1',//=>'xsd:string',
    'Cust_adress2',//=>'xsd:string',
    'FLAG_ACT',//=>'xsd:string',
    'CITY_DESC',//=>'xsd:string',
    'REGION')));//=>'xsd:string')));
  $server->register(
            'WsClientData',
            array('cod_client' => 'xsd:string'),     // input parameters
            array('Res' => 'tns:client_data_struct'),                            // output parameter
            $ns,                                                        // namespace
            "$ns#WsClientData",                                               // soapaction
            'rpc',                                                      // style
            'encoded',                                                  // use
            'Get the client data '            // documentation
            );
  function WsClientData($cod_client){
         $client=new bt_client($cod_client);
         if ($client->getError()) return $client->getError();
         else $result=array('Val'=>array(
            'Nume_client'=>$client->get_client_name(),
            'Tip_client'=>$client->get_client_type(),
            'cnp_cui'=>$client->get_client_cnp(),
            'reg_comert'=>$client->get_client_reg_com(),
            'Cust_adress1'=>$client->get_client_adress(),
            'Cust_adress2'=>'.',
            'FLAG_ACT'=>'1',
            'CITY_DESC'=>'',
            'REGION'=>''
         ));
        return $result;
        }    
        
  $server->service($HTTP_RAW_POST_DATA);
?>
