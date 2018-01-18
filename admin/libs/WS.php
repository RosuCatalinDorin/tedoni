<?php
include('nusoap.php');
//include('../functions/base_functions.php');

function xml2array($contents, $get_attributes=1, $priority = 'tag') { 
    if(!$contents) return array(); 

    if(!function_exists('xml_parser_create')) { 
        //print "'xml_parser_create()' function not found!"; 
        return array(); 
    } 

    //Get the XML parser of PHP - PHP must have this module for the parser to work 
    $parser = xml_parser_create(''); 
    xml_parser_set_option($parser, XML_OPTION_TARGET_ENCODING, "UTF-8"); # http://minutillo.com/steve/weblog/2004/6/17/php-xml-and-character-encodings-a-tale-of-sadness-rage-and-data-loss 
    xml_parser_set_option($parser, XML_OPTION_CASE_FOLDING, 0); 
    xml_parser_set_option($parser, XML_OPTION_SKIP_WHITE, 1); 
    xml_parse_into_struct($parser, trim($contents), $xml_values); 
    xml_parser_free($parser); 

    if(!$xml_values) return;//Hmm... 

    //Initializations 
    $xml_array = array(); 
    $parents = array(); 
    $opened_tags = array(); 
    $arr = array(); 

    $current = &$xml_array; //Refference 

    //Go through the tags. 
    $repeated_tag_index = array();//Multiple tags with same name will be turned into an array 
    foreach($xml_values as $data) { 
        unset($attributes,$value);//Remove existing values, or there will be trouble 

        //This command will extract these variables into the foreach scope 
        // tag(string), type(string), level(int), attributes(array). 
        extract($data);//We could use the array by itself, but this cooler. 

        $result = array(); 
        $attributes_data = array(); 
         
        if(isset($value)) { 
            if($priority == 'tag') $result = $value; 
            else $result['value'] = $value; //Put the value in a assoc array if we are in the 'Attribute' mode 
        } 

        //Set the attributes too. 
        if(isset($attributes) and $get_attributes) { 
            foreach($attributes as $attr => $val) { 
                if($priority == 'tag') $attributes_data[$attr] = $val; 
                else $result['attr'][$attr] = $val; //Set all the attributes in a array called 'attr' 
            } 
        } 

        //See tag status and do the needed. 
        if($type == "open") {//The starting of the tag '<tag>' 
            $parent[$level-1] = &$current; 
            if(!is_array($current) or (!in_array($tag, array_keys($current)))) { //Insert New tag 
                $current[$tag] = $result; 
                if($attributes_data) $current[$tag. '_attr'] = $attributes_data; 
                $repeated_tag_index[$tag.'_'.$level] = 1; 

                $current = &$current[$tag]; 

            } else { //There was another element with the same tag name 

                if(isset($current[$tag][0])) {//If there is a 0th element it is already an array 
                    $current[$tag][$repeated_tag_index[$tag.'_'.$level]] = $result; 
                    $repeated_tag_index[$tag.'_'.$level]++; 
                } else {//This section will make the value an array if multiple tags with the same name appear together 
                    $current[$tag] = array($current[$tag],$result);//This will combine the existing item and the new item together to make an array 
                    $repeated_tag_index[$tag.'_'.$level] = 2; 
                     
                    if(isset($current[$tag.'_attr'])) { //The attribute of the last(0th) tag must be moved as well 
                        $current[$tag]['0_attr'] = $current[$tag.'_attr']; 
                        unset($current[$tag.'_attr']); 
                    } 

                } 
                $last_item_index = $repeated_tag_index[$tag.'_'.$level]-1; 
                $current = &$current[$tag][$last_item_index]; 
            } 

        } elseif($type == "complete") { //Tags that ends in 1 line '<tag />' 
            //See if the key is already taken. 
            if(!isset($current[$tag])) { //New Key 
                $current[$tag] = $result; 
                $repeated_tag_index[$tag.'_'.$level] = 1; 
                if($priority == 'tag' and $attributes_data) $current[$tag. '_attr'] = $attributes_data; 

            } else { //If taken, put all things inside a list(array) 
                if(isset($current[$tag][0]) and is_array($current[$tag])) {//If it is already an array... 

                    // ...push the new element into that array. 
                    $current[$tag][$repeated_tag_index[$tag.'_'.$level]] = $result; 
                     
                    if($priority == 'tag' and $get_attributes and $attributes_data) { 
                        $current[$tag][$repeated_tag_index[$tag.'_'.$level] . '_attr'] = $attributes_data; 
                    } 
                    $repeated_tag_index[$tag.'_'.$level]++; 

                } else { //If it is not an array... 
                    $current[$tag] = array($current[$tag],$result); //...Make it an array using using the existing value and the new value 
                    $repeated_tag_index[$tag.'_'.$level] = 1; 
                    if($priority == 'tag' and $get_attributes) { 
                        if(isset($current[$tag.'_attr'])) { //The attribute of the last(0th) tag must be moved as well 
                             
                            $current[$tag]['0_attr'] = $current[$tag.'_attr']; 
                            unset($current[$tag.'_attr']); 
                        } 
                         
                        if($attributes_data) { 
                            $current[$tag][$repeated_tag_index[$tag.'_'.$level] . '_attr'] = $attributes_data; 
                        } 
                    } 
                    $repeated_tag_index[$tag.'_'.$level]++; //0 and 1 index is already taken 
                } 
            } 

        } elseif($type == 'close') { //End of tag '</tag>' 
            $current = &$parent[$level-1]; 
        } 
    } 
     
    return($xml_array); 
} 
function print_r_tree($data){
    // capture the output of print_r
    $out =str_replace("[","<br>[", print_r($data, true));

    // replace something like '[element] => <newline> (' with <a href="javascript:toggleDisplay('...');">...</a><div id="..." style="display: none;">
  $out = preg_replace('/([ \t]*)(\[[^\]]+\][ \t]*\=\>[ \t]*[a-z0-9 \t_]+)\n[ \t]*\(/iUe',"'\\1<a href=\"javascript:toggleDisplay(\''.(\$id = substr(md5(rand().'\\0'), 0, 7)).'\');\">\\2</a><div id=\"'.\$id.'\" style=\"display: none;\">'", $out);

    // replace ')' on its own on a new line (surrounded by whitespace is ok) with '</div>
   $out = preg_replace('/^\s*\)\s*$/m', '</div>', $out);

    // print the javascript function toggleDisplay() and then the transformed output
    echo '<script language="Javascript">function toggleDisplay(id) { document.getElementById(id).style.display = (document.getElementById(id).style.display == "block") ? "none" : "block"; }</script>'."\n$out";
}
function ws_get_acc_branch($cont){
    $a=new coreServ('get_acc_branch',$cont);
    //$a=new bt_client('0A35738');
    if ($a->getError()) die($a->getError());
    else return $a->get_branch_code();

}
/*function get_value_by_path($__xml_tree, $__tag_path){ 
    $tmp_arr =& $__xml_tree; 
    $tag_path = explode('/', $__tag_path); 
    foreach($tag_path as $tag_name) 
    { 
        $res = false; 
        foreach($tmp_arr as $key => $node) 
        { 
            if(is_int($key) && $node['name'] == $tag_name) 
            { 
                $tmp_arr = $node; 
                $res = true; 
                break; 
            } 
        } 
        if(!$res) 
            return false; 
    } 
    return $tmp_arr; 
}*/

class bt_client //detalii client
{
    private  $wsdl="http://fcube-ws:7053/FCUBSCustomerService/FCUBSCustomerService?wsdl";
    private  $client;
    private  $accounts;
    private  $response;
    private  $error=Null;
    private  $client_data=Array();
    
    private function set_client_data(){
        $b=$this->get_response_body();
        $b=$b['Customer-Full']; 
        //print_r_tree($b);
        $this->client_data[nume]=$b['FULLNAME'];
        $this->client_data[cnp]=$b['SNAME'];
        $this->client_data[tip_client]=$b['CTYPE'];
        $this->client_data[first_name]=$b['Custpersonal']['FSTNAME'];
        $this->client_data[midle_name]=$b['Custpersonal']['MIDNAME'];
        $this->client_data[last_name]=$b['Custpersonal']['LSTNAME'];
        $this->client_data[rezident]=$b['Custpersonal']['RESSTATUS'];
        $this->client_data[sex]=$b['Custpersonal']['sex'];
    }
    
    function __construct($idclient){
       $this->client=new soapclient($this->wsdl, array());
       $err = $this->client->getError();
       if ($err)  $this->error='<h2>Constructor error</h2><pre>' . $err . '</pre>';
       else { 
            $param=array(
                'FCUBS_HEADER'=>array
                    (
                        'SOURCE'    =>'BTPAID',
                        'UBSCOMP'   =>'FCUBS',
                        'USERID'    =>'FCBTPAID',
                        'BRANCH'    =>'000',
                        'SERVICE'   =>'FCUBSCustomerService',
                        'OPERATION' =>'QueryCustomer',
                        'FUNCTIONID'=>'STDCIF',
                        'ACTION'    =>'EXECUTEQUERY'),
                'FCUBS_BODY'=>array('Customer-IO'=>array('CUSTNO'=>$idclient)),
                'http://fcubs.ofss.com/service/FCUBSCustomerService');
            $this->client->call('QUERYCUSTOMER_IOFS_REQ',$param);
           // print_r_tree($param);
            if ($this->client->fault) {
                $this->error='<h2>Fault</h2><pre>'.$this->client->fault. '</pre>';} 
            else {
                $err = $this->client->getError(); // Check for errors
                if ($err) {  // Display the error
                    $this->error='<h2>Error</h2><pre>' . $err . '</pre>';
                    } 
                else {  // Set te the result
                    $this->response=xml2array($this->client->responseData);
                    if ($this->get_response_status()!='SUCCESS') {
                            $this->error=$this->get_response_status()." : ".$this->get_response_error_reason();
                            if ($this->get_response_error_code()!='ST-VALS-002')
                                my_log(get_user()." WS bt_client : ".$this->get_response_error_reason());
                            }
                    else $this->set_client_data();
                }
            
            }
                
       }
   }
    function get_response_head(){
        return $this->response['S:Envelope']['S:Body']['QUERYCUSTOMER_IOFS_RES']['FCUBS_HEADER'];
}
    function get_response_body(){return $this->response['S:Envelope']['S:Body']['QUERYCUSTOMER_IOFS_RES']['FCUBS_BODY'];}
    function getError(){
        if ($this->error==null) return false;
        else return $this->error;
    }
    function get_response_status(){$r=$this->get_response_head($this->response);return $r['MSGSTAT'];}
    function get_response_error_reason(){
        $r=$this->get_response_body();
        return $r['FCUBS_ERROR_RESP']['ERROR'][0]['EDESC'];}
    function get_response_error_code(){
        $r=$this->get_response_body();
        return $r['FCUBS_ERROR_RESP']['ERROR'][0]['ECODE'];}

    function get_client_data(){
        return $this->client_data;
    }
    function get_all_client_data(){
        $b=$this->get_response_body();
        $b=$b['Customer-Full'];
        return $b ;
    }
    function get_client_type(){
        $b=$this->get_response_body();
        $b=$b['Customer-Full']['CTYPE'];
        return $b ;
    }
    function get_client_name(){
        $b=$this->get_response_body();
        $b=$b['Customer-Full']['FULLNAME'];
        return $b ;
    }
    function get_client_cnp(){
    $b=$this->get_response_body();
    $b=explode("_",$b['Customer-Full']['SNAME']);
    return $b[0];
}
    function get_client_CI(){
        
        $b=$this->get_response_body();
        $b=$b['Customer-Full']['UDF4'];
        $b=explode("+",$b);
        return $b;
        //0 - tip id 
        //1 - SERIA
        //2 - Numarul 
        //3 - Eliberat de 
        //4 - Eliberat la data de 
        
    }
    function get_client_reg_com(){

        $b=$this->get_response_body();
        $b=$b['Customer-Full']['Custcorp'][NATIONID];
        return $b;


    }
     
    function get_client_adress($formated='in_line'){
        $b=$this->get_response_body();
        $b=$b['Customer-Full']['ADDRLN1'].$b['Customer-Full']['ADDRLN2'].$b['Customer-Full']['ADDRLN3'].$b['Customer-Full']['ADDRLN4'];
        if ($formated=='in_line'){
                        $b=str_replace('#FN','#-',$b);
                        $b=explode("#",$b);
                        $b="Str. ".$b[0].", Nr.".$b[1].", Bl.".$b[2].", Etj.".$b[3].", Ap.".$b[5].", Loc.".$b[6].", Cod Postal ".$b[7].", Jud.".$b[8]." ".$b[9];
                        
        }
        else $b=str_replace("#"," ",$b);
        return $b;            
    }
    function get_relationship(){
        $b=$this->get_response_body();
        $b=$b['Customer-Full']['Custaccdet']['Relationship-Linkage'];
        if ($b[0]) return $b ;
        else {
             $this->response['S:Envelope']['S:Body']['QUERYCUSTOMER_IOFS_RES']['FCUBS_BODY']['Customer-Full']['Custaccdet']['Relationship-Linkage'][0]=$b;
             unset($this->response['S:Envelope']['S:Body']['QUERYCUSTOMER_IOFS_RES']['FCUBS_BODY']['Customer-Full']['Custaccdet']['Relationship-Linkage']['CUSTOMER']);
             unset($this->response['S:Envelope']['S:Body']['QUERYCUSTOMER_IOFS_RES']['FCUBS_BODY']['Customer-Full']['Custaccdet']['Relationship-Linkage']['RELATIONSHIP']);
             unset($this->response['S:Envelope']['S:Body']['QUERYCUSTOMER_IOFS_RES']['FCUBS_BODY']['Customer-Full']['Custaccdet']['Relationship-Linkage']['INHERIT']);
             unset($this->response['S:Envelope']['S:Body']['QUERYCUSTOMER_IOFS_RES']['FCUBS_BODY']['Customer-Full']['Custaccdet']['Relationship-Linkage']['DESCP']);
             $b=$this->get_response_body();
             $b=$b['Customer-Full']['Custaccdet']['Relationship-Linkage'];
             return $b;
        } 
    }

    function extend_relationship(){
                    $b=$this->get_relationship();
                    for($i=0;$i<count($b);$i++)
                        $this->response['S:Envelope']['S:Body']['QUERYCUSTOMER_IOFS_RES']['FCUBS_BODY']['Customer-Full']['Custaccdet']['Relationship-Linkage'][$i]['EXTENSION']=new bt_client($b[$i]['CUSTOMER']);
        
    }

}

class accounts//lista conturi client
{
    private  $wsdl="http://fcube-ws:7053/FCUBSAccService/FCUBSAccService?wsdl";
    private  $accs;
    private  $error;
    private  $response;
    function __construct($idclient){
     $this->accs=new soapclient($this->wsdl, array());
     $this->accs->setDebugLevel(0);
     //  echo '<br>debug level:'.$this->accs->getDebugLevel();
     //echo '<br><br>Debug:'.$this->accs->getDebug()."<br><br>";$this->accs->clearDebug();
       $err = $this->accs->getError();
     //  echo '<br><br>Debug:'.$this->accs->getDebug()."<br><br>";$this->accs->clearDebug();
       if ($err)  $this->error='<h2>Constructor error</h2><pre>' . $err . '</pre>';
       else { 
            $param=array(
                'FCUBS_HEADER'=>array
                    (   
                        'SOURCE'    =>'BTPAID',
                        'UBSCOMP'   =>'FCUBS',
                        'USERID'    =>'FCBTPAID',
                        'BRANCH'    =>'000',
                        'SERVICE'   =>'FCUBSAccService',
                        'OPERATION' =>'QueryCustAccStatus',
                        'FUNCTIONID'=>'STQACSTS',
                        'ACTION'    =>'VIEW'),
                
                'FCUBS_BODY'=>array(
                        'Account-Status'=>array(
                            'ACC_STAT'=>array(
                              'CUST_NO'=>$idclient))),
                'http://fcubs.ofss.com/service/FCUBSAccService');
            $this->accs->call('QUERYCUSTACCSTATUS_IOFS_REQ',$param,'http://fcubs.ofss.com/service/FCUBSAccService');
        //    echo '<br><br>Debug:'.$this->accs->getDebug()."<br><br>";
            //print_r_tree($param);
            if ($this->accs->fault) {
                $this->error='<h2>Fault</h2><pre>'.$this->accs->fault. '</pre>';} 
            else {
                $err = $this->accs->getError(); // Check for errors
                if ($err) {  // Display the error
                    $this->error='<h2>Error</h2><pre>' . $err . '</pre>';
                    } 
                else {  // Set te the result
                    $this->response=xml2array($this->accs->responseData);
                    if ($this->get_response_status()!='SUCCESS') {
                        $this->error=$this->get_response_status()." : ".$this->get_response_error_reason();
                        //my_log(get_user()." WS accounts : ".$this->get_response_error_reason());
                    }
                    
                }
            
            }
                
       }
   }
   
    function getResponse(){
        return $this->response;
    }
    function get_response_status(){$r=$this->get_response_head($this->response);return $r['MSGSTAT'];}
    function get_response_head(){
        return $this->response['S:Envelope']['S:Body']['QUERYCUSTACCSTATUS_IOFS_RES']['FCUBS_HEADER'];
}
    function get_response_body(){return $this->response['S:Envelope']['S:Body']['QUERYCUSTACCSTATUS_IOFS_RES']['FCUBS_BODY'];}
    function getError(){
        if ($this->error==null) return false;
        else return $this->error;
    }
    function get_response_error_reason(){
        $r=$this->get_response_body();
        return $r['FCUBS_ERROR_RESP']['ERROR']['EDESC'];}
    function getNoOfAccounts(){
        $r=$this->get_response_body();
        return count($r['Account-Status']['ACC_STAT']);
    }    
    function getAllAccounts(){
        $r=$this->get_response_body();
        $r=$r['Account-Status']['ACC_STAT'];
        if(gettype($r[0])=='NULL'){$b=Array();$b[0]=$r; return $b;};
        return $r;
    }    
    function getAccVal($val /* char(3)*/){
        $a=$this->getAllAccounts();
        $b=Array();
        $i=0;
        foreach($a as $p)
           if ((substr($p['ACC_ID'],3,3)==strtoupper($val))/* and (substr($p['ACC_ID'],0,3)!='000')*/)
            $b[$i++]=$p;
        return $b;    
    }
    function getAccByType($type /* char(3)*/){
        $a=$this->getAllAccounts();
        $b=Array();
        $i=0;
        $t=explode(",",$type);
        foreach($t as $type){
        foreach($a as $p)
            if ((substr($p['ACC_ID'],6,4)==strtoupper($type)) /*and (substr($p['ACC_ID'],0,3)!='000')*/ and (substr($p['IBAN'],13,3)!='207' or substr($p['IBAN'],8,3)==substr($p['ACC_ID'],3,3)))
                $b[$i++]=$p;
        }
        return $b;
    }
    function getAccValType($val /* char(3)*/,$type /*char(4)*/){
        $a=$this->getAllAccounts();
        $b=Array();
        $i=0;
        if (count($a)==1) return $a;
        /*
        if (count($a)==1) {
            if ((substr($a['ACC_ID'],3,3)==strtoupper($val) and substr($a['ACC_ID'],6,4)==strtoupper($type))  and (substr($a['IBAN'],13,3)!='207' or substr($a['IBAN'],8,3)==substr($a['ACC_ID'],3,3)))
                return $a;
            else return $b;
        }*/
        foreach($a as $p)
            if ((substr($p['ACC_ID'],3,3)==strtoupper($val) and substr($p['ACC_ID'],6,4)==strtoupper($type))  and (substr($p['IBAN'],13,3)!='207' or substr($p['IBAN'],8,3)==substr($p['ACC_ID'],3,3)))
                $b[$i++]=$p;
        return $b;
    }
}

class account //detaliere cont client
{
    private  $wsdl="http://fcube-ws:7053/FCUBSAccService/FCUBSAccService?wsdl";
    private  $accs;
    private  $error;
    private  $response;
    function __construct($cont){
     $this->accs=new soapclient($this->wsdl, array());
     $this->accs->setDebugLevel(0);
     //  echo '<br>debug level:'.$this->accs->getDebugLevel();
     //echo '<br><br>Debug:'.$this->accs->getDebug()."<br><br>";$this->accs->clearDebug();
       $err = $this->accs->getError();
     //  echo '<br><br>Debug:'.$this->accs->getDebug()."<br><br>";$this->accs->clearDebug();
       if ($err)  $this->error='<h2>Constructor error</h2><pre>' . $err . '</pre>';
       else { 
            $param=array(
                'FCUBS_HEADER'=>array
                    (   
                        'SOURCE'    =>'BTPAID',
                        'UBSCOMP'   =>'FCUBS',
                        'USERID'    =>'FCBTPAID',
                        'BRANCH'    =>'000',
                        'SERVICE'   =>'FCUBSAccService',
                        'OPERATION' =>'QueryAccBal',
                        'FUNCTIONID'=>'STACCBAL',
                        'ACTION'    =>'EXECUTEQUERY'),
                
                'FCUBS_BODY'=>array(
                        'ACC-Balance'=>array(
                            'ACC_BAL'=>array(
                                'BRANCH_CODE'=>ws_get_acc_branch($cont),
                                'CUST_AC_NO'=>$cont))),
                'http://fcubs.ofss.com/service/FCUBSAccService');
            $this->accs->call('QUERYACCBAL_IOFS_REQ',$param,'http://fcubs.ofss.com/service/FCUBSAccService');
        //    echo '<br><br>Debug:'.$this->accs->getDebug()."<br><br>";
            //print_r_tree($param);
            if ($this->accs->fault) {
                $this->error='<h2>Fault</h2><pre>'.$this->accs->fault. '</pre>';} 
            else {
                $err = $this->accs->getError(); // Check for errors
                if ($err) {  // Display the error
                    $this->error='<h2>Error</h2><pre>' . $err . '</pre>';
                    } 
                else {  // Set te the result
                    $this->response=xml2array($this->accs->responseData);
                    if ($this->get_response_status()!='SUCCESS') {
                        $this->error=$this->get_response_status()." : ".$this->get_response_error_reason();
                        my_log(get_user()." WS account_details : ".$this->get_response_error_reason());
                    }
                    
                }
            
            }
                
       }
   }
   
    function getResponse(){
        return $this->response;
    }
    function get_response_status(){$r=$this->get_response_head($this->response);return $r['MSGSTAT'];}
    function get_response_head(){
        return $this->response['S:Envelope']['S:Body']['QUERYACCBAL_IOFS_RES']['FCUBS_HEADER'];
}
    function get_response_body(){return $this->response['S:Envelope']['S:Body']['QUERYACCBAL_IOFS_RES']['FCUBS_BODY'];}
    function getError(){
        if ($this->error==null) return false;
        else return $this->error;
    }
    function get_response_error_reason(){
        $r=$this->get_response_body();
        return $r['FCUBS_ERROR_RESP']['ERROR']['EDESC'];}
    function get_cur_balance(){
       $r=$this->get_response_body();
       return $r['ACC-Balance']['ACC_BAL']['CURBAL'];
    }
    function get_avl_balance(){
       $r=$this->get_response_body();
       return $r['ACC-Balance']['ACC_BAL']['DIS_TOT_AVL_AMOUNT'];
    }
    function get_currency(){
       $r=$this->get_response_body();
       return $r['ACC-Balance']['ACC_BAL']['CCY'];
    }

}

class orn_insert // insereaza ornuri pe un cont
{
    private  $wsdl="http://fcube-ws:7053/FCUBSAccService/FCUBSAccService?wsdl";
    private  $accs;
    private  $error;
    private  $response;
    function __construct($cont,$serie,$fchkno,$chkl){
     $this->accs=new soapclient($this->wsdl, array());
     $this->accs->setDebugLevel(0);
     //  echo '<br>debug level:'.$this->accs->getDebugLevel();
    // echo '<br><br>Debug:'.$this->accs->getDebug()."<br><br>";$this->accs->clearDebug();
       $err = $this->accs->getError();
    //   echo '<br><br>Debug:'.$this->accs->getDebug()."<br><br>";$this->accs->clearDebug();
       if ($err)  $this->error='<h2>Constructor error</h2><pre>' . $err . '</pre>';
       else { 
            $param=array(
                'FCUBS_HEADER'=>array
                    (   
                        'SOURCE'    =>'BTPAID',
                        'UBSCOMP'   =>'FCUBS',
                        'USERID'    =>'FCBTPAID',
                        'BRANCH'    =>ws_get_acc_branch($cont),
                        'MODULEID'  =>'ST',
                        'SERVICE'   =>'FCUBSAccService',
                        'OPERATION' =>'CheckBookNew',
                        'FUNCTIONID'=>'CADCHBOO',
                        'ACTION'    =>'NEW'),
                
                'FCUBS_BODY'=>array(
                        'Check-Book-IO'=>array(
                            'ACC'=>$cont,
                            'FCHKNO'=>$fchkno,
                            'CHKL'=>$chkl,
                            'ORDT'=>date('Y-m-d',time()),
                            'ISSDT'=>date('Y-m-d',time()),
                            'REQSTAT'=>'Delivered',
                            'UDFDETAILS'=>array(
                                'FUNCTIONID'=>'CADCHBOO',
                                'FIELD_NAME'=>'SERIECHQ',
                                'FIELD_VALUE'=>$serie
                                )
                            )
                        ),
                'http://fcubs.ofss.com/service/FCUBSAccService');
            $this->accs->call('CHECKBOOKNEW_IOPK_REQ',$param,'http://fcubs.ofss.com/service/FCUBSAccService');
           // echo '<br><br>Debug:'.$this->accs->getDebug()."<br><br>";
          //  print_r_tree($param);
            if ($this->accs->fault) {
                $this->error='<h2>Fault</h2><pre>'.$this->accs->fault. '</pre>';} 
            else {
                $err = $this->accs->getError(); // Check for errors
                if ($err) {  // Display the error
                    $this->error='<h2>Error</h2><pre>' . $err . '</pre>';
                    } 
                else {  // Set te the result
                    $this->response=xml2array($this->accs->responseData);
                    if ($this->get_response_status()!='SUCCESS'){
                     $this->error=$this->get_response_status()." : ".$this->get_response_error_reason();
                     //my_log(get_user()." WS orn_insert : ".$this->get_response_error_reason());
                    }
                    
                }
            
            }
                
       }
   }
   
    function getResponse(){
        return $this->response;
    }
    function get_response_status(){$r=$this->get_response_head($this->response);return $r['MSGSTAT'];}
    function get_response_head(){
        return $this->response['S:Envelope']['S:Body']['CHECKBOOKNEW_IOPK_RES']['FCUBS_HEADER'];
}
    function get_response_body(){return $this->response['S:Envelope']['S:Body']['CHECKBOOKNEW_IOPK_RES']['FCUBS_BODY'];}
    function getError(){
        if ($this->error==null) return false;
        else  return $this->error;
    }
    function get_response_error_reason(){
        $r=$this->get_response_body();
        
        return $r['FCUBS_ERROR_RESP']['ERROR'][0]['EDESC'];}

}

class orn_insert_check//verifica daca exista bifa pe CHQBOOK
{
    private  $wsdl="http://fcube-ws:7053/FCUBSAccService/FCUBSAccService?wsdl";
    private  $accs;
    private  $error;
    private  $response;
    function __construct($cont){
     $this->accs=new soapclient($this->wsdl, array());
     $this->accs->setDebugLevel(0);
     //  echo '<br>debug level:'.$this->accs->getDebugLevel();
    // echo '<br><br>Debug:'.$this->accs->getDebug()."<br><br>";$this->accs->clearDebug();
       $err = $this->accs->getError();
    //   echo '<br><br>Debug:'.$this->accs->getDebug()."<br><br>";$this->accs->clearDebug();
       if ($err)  $this->error='<h2>Constructor error</h2><pre>' . $err . '</pre>';
       else {
           $br_cont = ws_get_acc_branch($cont);
           $param=array(
                'FCUBS_HEADER'=>array
                    (   
                        'SOURCE'    =>'BTPAID',
                        'UBSCOMP'   =>'FCUBS',
                        'USERID'    =>'FCBTPAID',
                        'BRANCH'    =>$br_cont,
                        'MODULEID'  =>'ST',
                        'SERVICE'   =>'FCUBSAccService',
                        'OPERATION' =>'QueryCustAcc',
                        'FUNCTIONID'=>'STDCUSAC',
                        'ACTION'    =>'EXECUTEQUERY'),
                
                'FCUBS_BODY'=>array(
                        'Cust-Account-IO'=>array(
                            'BRN'=>$br_cont,
                            'ACC'=>$cont

                            )
                        ),
                'http://fcubs.ofss.com/service/FCUBSAccService');
            $this->accs->call('QUERYCUSTACC_IOFS_REQ',$param,'http://fcubs.ofss.com/service/FCUBSAccService');
           // echo '<br><br>Debug:'.$this->accs->getDebug()."<br><br>";
          //  print_r_tree($param);
            if ($this->accs->fault) {
                $this->error='<h2>Fault</h2><pre>'.$this->accs->fault. '</pre>';} 
            else {
                $err = $this->accs->getError(); // Check for errors
                if ($err) {  // Display the error
                    $this->error='<h2>Error</h2><pre>' . $err . '</pre>';
                    } 
                else {  // Set te the result
                    $this->response=xml2array($this->accs->responseData);
                    if ($this->get_response_status()!='SUCCESS'){
                         $this->error=$this->get_response_status()." : ".$this->get_response_error_reason();
                         my_log(get_user()." WS orn_insert_check : ".$this->get_response_error_reason());
                    }
                    
                }
            
            }
                
       }
   }
   
    function getResponse(){
        return $this->response;
    }
    function get_response_status(){$r=$this->get_response_head($this->response);return $r['MSGSTAT'];}
    function get_response_head(){
        return $this->response['S:Envelope']['S:Body']['QUERYCUSTACC_IOFS_RES']['FCUBS_HEADER'];
}
    function get_response_body(){return $this->response['S:Envelope']['S:Body']['QUERYCUSTACC_IOFS_RES']['FCUBS_BODY'];}
    function getError(){
        if ($this->error==null) return false;
        else return $this->error;
    }
    function get_response_error_reason(){
        $r=$this->get_response_body();
        
        return $r['FCUBS_ERROR_RESP']['ERROR'][0]['EDESC'];}
    function get_CHQBOOK(){return $this->response['S:Envelope']['S:Body']['QUERYCUSTACC_IOFS_RES']['FCUBS_BODY']['Cust-Account-Full']['CHQBOOK'];}
    function get_CHKNAME1(){return $this->response['S:Envelope']['S:Body']['QUERYCUSTACC_IOFS_RES']['FCUBS_BODY']['Cust-Account-Full']['CHKNAME1']?$this->response['S:Envelope']['S:Body']['QUERYCUSTACC_IOFS_RES']['FCUBS_BODY']['Cust-Account-Full']['CHKNAME1']:'';}

}

class orn_insert_set//pune bifa  pe CHQBOOK
{
    private  $wsdl="http://fcube-ws:7053/FCUBSAccService/FCUBSAccService?wsdl";
    private  $accs;
    private  $error;
    private  $response;
    function __construct($cont){
     $this->accs=new soapclient($this->wsdl, array());
     $this->accs->setDebugLevel(0);
     //  echo '<br>debug level:'.$this->accs->getDebugLevel();
    // echo '<br><br>Debug:'.$this->accs->getDebug()."<br><br>";$this->accs->clearDebug();
       $err = $this->accs->getError();
    //   echo '<br><br>Debug:'.$this->accs->getDebug()."<br><br>";$this->accs->clearDebug();
       if ($err)  $this->error='<h2>Constructor error</h2><pre>' . $err . '</pre>';
       else {
            $br_cont=ws_get_acc_branch($cont);
            $param=array(
                'FCUBS_HEADER'=>array
                    (   
                        'SOURCE'    =>'BTPAID',
                        'UBSCOMP'   =>'FCUBS',
                        'USERID'    =>'FCBTPAID',
                        'BRANCH'    =>$br_cont,
                        'MODULEID'  =>'ST',
                        'SERVICE'   =>'FCUBSAccService',
                        'SOURCE_OPERATION'=>'ModifyCustAcc',
                        'OPERATION' =>'ModifyCustAcc',
                        'FUNCTIONID'=>'STDCUSAC',
                        'ACTION'    =>'MODIFY'),
                
                'FCUBS_BODY'=>array(
                        'Cust-Account-Full'=>array(
                            'BRN'=>$br_cont,
                            'ACC'=>$cont,
                            'CUSTNO'=>substr($cont,10,7),
                            'ACCLS'=>'CT'.substr($cont,6,4),
                            'CHKNAME1'=>'ELIBERARE ID',
                            'CHQBOOK'=>'Y'

                            )
                        ),
                'http://fcubs.ofss.com/service/FCUBSAccService');
            $this->accs->call('MODIFYCUSTACC_FSFS_REQ',$param,'http://fcubs.ofss.com/service/FCUBSAccService');
           // echo '<br><br>Debug:'.$this->accs->getDebug()."<br><br>";
          //  print_r_tree($param);
            if ($this->accs->fault) {
                $this->error='<h2>Fault</h2><pre>'.$this->accs->fault. '</pre>';} 
            else {
                $err = $this->accs->getError(); // Check for errors
                if ($err) {  // Display the error
                    $this->error='<h2>Error</h2><pre>' . $err . '</pre>';
                    } 
                else {  // Set te the result
                    $this->response=xml2array($this->accs->responseData);
                    if ($this->get_response_status()!='SUCCESS') {
                            $this->error=$this->get_response_status()." : ".$this->get_response_error_reason();
                            my_log(get_user()." WS orn_insert_set : ".$this->get_response_error_reason());
                    }
                    
                }
            
            }
                
       }
   }
   
    function getResponse(){
        return $this->response;
    }
    function get_response_status(){$r=$this->get_response_head($this->response);return $r['MSGSTAT'];}
    function get_response_head(){
        return $this->response['S:Envelope']['S:Body']['MODIFYCUSTACC_FSFS_RES']['FCUBS_HEADER'];
}
    function get_response_body(){return $this->response['S:Envelope']['S:Body']['MODIFYCUSTACC_FSFS_RES']['FCUBS_BODY'];}
    function getError(){
        if ($this->error==null) return false;
        else return $this->error;
    }
    function get_response_error_reason(){
        $r=$this->get_response_body();
        
        return $r['FCUBS_ERROR_RESP']['ERROR'][0]['EDESC'];}

}
class orn_change_status//modificare stare CHQBOOK
{
    private  $wsdl="http://fcube-ws:7053/FCUBSAccService/FCUBSAccService?wsdl";
    private  $accs;
    private  $error;
    private  $response;
    function __construct($cont,$first,$file,$status,$obs){
     $this->accs=new soapclient($this->wsdl, array());
     $this->accs->setDebugLevel(0);
     //echo '<br>debug level:'.$this->accs->getDebugLevel();
     //echo '<br><br>Debug:'.$this->accs->getDebug()."<br><br>";$this->accs->clearDebug();
       $err = $this->accs->getError();
     //echo '<br><br>Debug:'.$this->accs->getDebug()."<br><br>";$this->accs->clearDebug();
       if ($err)  $this->error='<h2>Constructor error</h2><pre>' . $err . '</pre>';
       else {
            $br_cont=ws_get_acc_branch($cont);
            $param=array(
                'FCUBS_HEADER'=>array
                    (   
                        'SOURCE'    =>'BTPAID',
                        'UBSCOMP'   =>'FCUBS',
                        'USERID'    =>'FCBTPAID',
                        'BRANCH'    =>$br_cont,
                        'MODULEID'  =>'ST',
                        'SERVICE'   =>'FCUBSAccService',
                        'OPERATION' =>'AmendCheckLeaf',
                        'FUNCTIONID'=>'CADCHKLF',
                        'ACTION'    =>'AUTHORIZE'),
                
                'FCUBS_BODY'=>array(
                        'Account-List'=>array(
                           'ACC_LIST'=>array(
	                        'BRN'=>$br_cont,
                            'CUST_AC_NO'=>$cont,
                            'CHK_BK_NO'=>$first,
                            'CHK_LF_NO'=>$file,
                            'STATUS'=>$status,
                            'REMARKS'=>$obs
                            )
                          )
                        ),
                'http://fcubs.ofss.com/service/FCUBSAccService');
            $this->accs->call('AMENDCHECKLEAF_IOFS_REQ',$param,'http://fcubs.ofss.com/service/FCUBSAccService');
            //echo '<br><br>Debug:'.$this->accs->getDebug()."<br><br>";
            // print_r_tree($param);
            if ($this->accs->fault) {
                $this->error='<h2>Fault</h2><pre>'.$this->accs->fault. '</pre>';} 
            else {
                $err = $this->accs->getError(); // Check for errors
                if ($err) {  // Display the error
                    $this->error='<h2>Error</h2><pre>' . $err . '</pre>';
                    } 
                else {  // Set te the result
                    $this->response=xml2array($this->accs->responseData);
                    if ($this->get_response_status()!='SUCCESS'){
                         $this->error=$this->get_response_status()." : ".$this->get_response_error_reason();
                         //my_log(get_user()." WS orn_change_status : ".$this->get_response_error_reason());
                    }
                }
            
            }
                
       }
   }
   
    function getResponse(){
        return $this->response;
    }
    function get_response_status(){$r=$this->get_response_head($this->response);return $r['MSGSTAT'];}
    function get_response_head(){
        return $this->response['S:Envelope']['S:Body']['AMENDCHECKLEAF_IOFS_RES']['FCUBS_HEADER'];
}
    function get_response_body(){return $this->response['S:Envelope']['S:Body']['AMENDCHECKLEAF_IOFS_RES']['FCUBS_BODY'];}
    function getError(){
        if ($this->error==null) return false;
        else return $this->error;
    }
    function get_response_error_reason(){
        $r=$this->get_response_body();
        
        return $r['FCUBS_ERROR_RESP']['ERROR']['EDESC'];}

}
class orn_check_book_modify//modificare stare CHQBOOK
{
    private  $wsdl="http://fcube-ws:7053/FCUBSAccService/FCUBSAccService?wsdl";
    private  $accs;
    private  $error;
    private  $response;
    function __construct($cont,$first,$file,$status){
     $this->accs=new soapclient($this->wsdl, array());
     $this->accs->setDebugLevel(0);
     //echo '<br>debug level:'.$this->accs->getDebugLevel();
     //echo '<br><br>Debug:'.$this->accs->getDebug()."<br><br>";$this->accs->clearDebug();
       $err = $this->accs->getError();
     //echo '<br><br>Debug:'.$this->accs->getDebug()."<br><br>";$this->accs->clearDebug();
       if ($err)  $this->error='<h2>Constructor error</h2><pre>' . $err . '</pre>';
       else {
            $br_cont=ws_get_acc_branch($cont);
            $param=array(
                'FCUBS_HEADER'=>array
                    (   
                        'SOURCE'    =>'BTPAID',
                        'UBSCOMP'   =>'FCUBS',
                        'USERID'    =>'FCBTPAID',
                        'BRANCH'    =>$br_cont,
                        'MODULEID'  =>'ST',
                        'SERVICE'   =>'FCUBSAccService',
                        'OPERATION' =>'CheckBookModify',
                        'SOURCE_OPERATION'=>'CheckBookModify',
                        'FUNCTIONID'=>'CADCHBOO',
                        'ACTION'    =>'MODIFY'),
                
                'FCUBS_BODY'=>array(
                        'Check-Book-Full'=>array(
                           
                            'BRN'=>$br_cont,
                            'ACC'=>$cont,
                            'FCHKNO'=>$first,
                            'CHKL'=>$file,
                            'REQSTAT'=>$status,
                            'UDFDETAILS'=>array(
                                'FIELD_NAME'=>'SERIECHQ',
                                'FIELD_VALUE'=>'BTRL4NN'
                            )
                           
                          )
                        ),
                'http://fcubs.ofss.com/service/FCUBSAccService');
            $this->accs->call('CHECKBOOKMODIFY_FSFS_REQ',$param,'http://fcubs.ofss.com/service/FCUBSAccService');
            //echo '<br><br>Debug:'.$this->accs->getDebug()."<br><br>";
            // print_r_tree($param);
            if ($this->accs->fault) {
                $this->error='<h2>Fault</h2><pre>'.$this->accs->fault. '</pre>';} 
            else {
                $err = $this->accs->getError(); // Check for errors
                if ($err) {  // Display the error
                    $this->error='<h2>Error</h2><pre>' . $err . '</pre>';
                    } 
                else {  // Set te the result
                    $this->response=xml2array($this->accs->responseData);
                    if ($this->get_response_status()!='SUCCESS') {
                         $this->error=$this->get_response_status()." : ".$this->get_response_error_reason();
                         //my_log(get_user()." WS orn_check_book_modify : ".$this->get_response_error_reason());
                    }
                }
            
            }
                
       }
   }
   
    function getResponse(){
        return $this->response;
    }
    function get_response_status(){$r=$this->get_response_head($this->response);return $r['MSGSTAT'];}
    function get_response_head(){
        return $this->response['S:Envelope']['S:Body']['CHECKBOOKMODIFY_FSFS_RES']['FCUBS_HEADER'];
}
    function get_response_body(){return $this->response['S:Envelope']['S:Body']['CHECKBOOKMODIFY_FSFS_RES']['FCUBS_BODY'];}
    function getError(){
        if ($this->error==null) return false;
        else return $this->error;
    }
    function get_response_error_reason(){
        $r=$this->get_response_body();
        
        return $r['FCUBS_ERROR_RESP']['ERROR'][0]['EDESC'];}

}
class coreServ //detalii client
{
    private  $wsdl="http://fcube-ws:7053/FCUBSCoreService/FCUBSCoreService?wsdl";

    //$op=get_acc_branch


    function __construct($op,$parameters){
        $this->client=new soapclient($this->wsdl, array());
        //$this->client->setDebugLevel(0);
        $err = $this->client->getError();
        if ($err)  $this->error='<h2>Constructor error</h2><pre>' . $err . '</pre>';
        else {
            if ($op=='get_acc_branch'){

                $param=array(
                    'FCUBS_HEADER'=>array(
                        'SOURCE'    =>'TESTSYS',
                        'UBSCOMP'   =>'FCUBS',
                        'USERID'    =>'FCBTPAID',
                        'BRANCH'    =>'000',
                        'MODULEID'  =>'CO',
                        'SERVICE'   =>'FCUBSCoreService',
                        'OPERATION' =>'QueryAccBranch',
                        'FUNCTIONID'=>'COQACBRN',
                        'ACTION'    =>'VIEW'),
                    'FCUBS_BODY'=>array(
                        'CO-AccBranchDetails'=>array(
                            'Account_Type'=>'A',
                            'Account'=>$parameters)
                    ),
                    'http://fcubs.ofss.com/service/FCUBSCoreService');
                $this->client->call('QUERYACCBRANCH_FSFS_REQ',$param,'http://fcubs.ofss.com/service/FCUBSCoreService');
                //echo '<br><br>Debug:'.$this->client->getDebug()."<br><br>";
                //print_r_tree($param);
                if ($this->client->fault) {
                    $this->error='<h2>Fault</h2><pre>'.$this->client->fault. '</pre>';}
                else {
                    $err = $this->client->getError(); // Check for errors
                    if ($err) {  // Display the error

                        $this->error='<h2>Error</h2><pre>' . $err . '</pre>';
                    }
                    else {  // Set te the result
                        $this->response=xml2array($this->client->responseData);
                        if ($this->get_response_status()!='SUCCESS') {
                            $this->error=$this->get_response_status()." : ".$this->get_response_error_reason();
                            if ($this->get_response_error_code()!='ST-VALS-002')
                                my_log(get_user()." WS bt_client : ".$this->get_response_error_reason());
                        }

                    }

                }
            }
            else $this->error='<h2>Fault</h2><pre>Incorect operation '.$op.'</pre>';
        }
    }
    function get_response_head(){
        return $this->response['S:Envelope']['S:Body']['QUERYACCBRANCH_FSFS_RES']['FCUBS_HEADER'];
    }
    function get_response_body(){return $this->response['S:Envelope']['S:Body']['QUERYACCBRANCH_FSFS_RES']['FCUBS_BODY'];}
    function getError(){
        if ($this->error==null) return false;
        else return $this->error;
    }
    function get_response_status(){$r=$this->get_response_head($this->response);return $r['MSGSTAT'];}
    function get_response_error_reason(){
        $r=$this->get_response_body();
        return $r['FCUBS_ERROR_RESP']['ERROR']['EDESC'];}
    function get_response_error_code(){
        $r=$this->get_response_body();
        return $r['FCUBS_ERROR_RESP']['ERROR'][0]['ECODE'];}
    function get_branch_code(){

        $b=$this->get_response_body();
        $b=$b['CO-AccBranchDetails']['Branch_Code'];
        return $b;

    }
}
if ($_REQUEST[op]=='orn_stop'){
    // start= numarul primei file din carnet
    // nr = numarul filei ce se stopeaza
$a=new orn_change_status($_REQUEST[cont],$_REQUEST[start],$_REQUEST[nr],$_REQUEST[status],$_REQUEST[motiv]);
if ($a->getError()) echo $a->getError();
else echo $a->get_response_status();
//print_r_tree($a);
}

if ($_REQUEST[op]=='orn_start'){
$a=new orn_change_status($_REQUEST[cont],$_REQUEST[start],$_REQUEST[nr],$_REQUEST[status],$_REQUEST[motiv]);
if ($a->getError()) echo $a->getError();
else echo $a->get_response_status();
//print_r_tree($a);
}
if ($_REQUEST[op]=='test'){
    include ('../functions/base_functions.php');
    echo ws_get_acc_branch('213RONCRT00A3573801');
    /*
    echo "<br>____________________________________________________________________________<br>";
    $b=new accounts('0A35738');
    print_r_tree($b->getAllAccounts());*/
}
?>
