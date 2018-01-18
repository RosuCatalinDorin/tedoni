<?php
/**
 * Created by PhpStorm.
 * User: Paul.Sas
 * Date: 02/09/2017
 * Time: 11:23 AM
 */
error_reporting(0);
require_once ('../libs/WS.php');

if ($_REQUEST['op']=='clientAccount'){
    $acc=new accounts($_REQUEST['cust_no']);
    $data=array();
    $data['rows']=array();
    $accs=$acc->getAccByType('crt0');
    foreach ($accs as $ac){
        $row=array();
        $row['id']=$ac['ACC_ID'];
        $row['data']=array($ac['ACC_ID'],$ac['BRANCH_NO'],substr($ac['ACC_ID'],6,4),substr($ac['ACC_ID'],3,3),$ac['IBAN']);
        $data['rows'][]=$row;
    }
    $accs=$acc->getAccByType('incs');
    foreach ($accs as $ac){
        $row=array();
        $row['id']=$ac['ACC_ID'];
        $row['data']=array($ac['ACC_ID'],$ac['BRANCH_NO'],substr($ac['ACC_ID'],6,4),substr($ac['ACC_ID'],3,3),$ac['IBAN']);
        $data['rows'][]=$row;
    }
    $accs=$acc->getAccByType('cons');
    foreach ($accs as $ac){
        $row=array();
        $row['id']=$ac['ACC_ID'];
        $row['data']=array($ac['ACC_ID'],$ac['BRANCH_NO'],substr($ac['ACC_ID'],6,4),substr($ac['ACC_ID'],3,3),$ac['IBAN']);
        $data['rows'][]=$row;
    }
    $accs=$acc->getAccValType('ron','cert');
    foreach ($accs as $ac){
        $row=array();
        $row['id']=$ac['ACC_ID'];
        $row['data']=array($ac['ACC_ID'],$ac['BRANCH_NO'],substr($ac['ACC_ID'],6,4),substr($ac['ACC_ID'],3,3),$ac['IBAN']);
        $data['rows'][]=$row;
    }
    echo json_encode($data);

}
if ($_REQUEST['op']=='clientAccountCombo'){
    $acc=new accounts($_REQUEST['cust_no']);
    $data=array();
    $data['options']=array();
    $accs=$acc->getAccByType('crt0');
    foreach ($accs as $ac){
        $row=array();
        $row['value']=$ac['ACC_ID'];
        $row['text']=array("c1"=>$ac['ACC_ID'],"c2"=>$ac['BRANCH_NO'],"c3"=>substr($ac['ACC_ID'],6,4),"c4"=>substr($ac['ACC_ID'],3,3),"c5"=>$ac['IBAN']);
        $data['options'][]=$row;
    }
    $accs=$acc->getAccByType('incs');
    foreach ($accs as $ac){
        $row=array();
        $row['value']=$ac['ACC_ID'];
        $row['text']=array("c1"=>$ac['ACC_ID'],"c2"=>$ac['BRANCH_NO'],"c3"=>substr($ac['ACC_ID'],6,4),"c4"=>substr($ac['ACC_ID'],3,3),"c5"=>$ac['IBAN']);
        $data['options'][]=$row;
    }
    $accs=$acc->getAccByType('cons');
    foreach ($accs as $ac){
        $row=array();
        $row['value']=$ac['ACC_ID'];
        $row['text']=array("c1"=>$ac['ACC_ID'],"c2"=>$ac['BRANCH_NO'],"c3"=>substr($ac['ACC_ID'],6,4),"c4"=>substr($ac['ACC_ID'],3,3),"c5"=>$ac['IBAN']);
        $data['options'][]=$row;
    }
    $accs=$acc->getAccValType('ron','cert');
    foreach ($accs as $ac){
        $row=array();
        $row['value']=$ac['ACC_ID'];
        $row['text']=array("c1"=>$ac['ACC_ID'],"c2"=>$ac['BRANCH_NO'],"c3"=>substr($ac['ACC_ID'],6,4),"c4"=>substr($ac['ACC_ID'],3,3),"c5"=>$ac['IBAN']);
        $data['options'][]=$row;
    }
    echo json_encode($data);

}
if ($_REQUEST['op']=='clientReprezentant'){
    error_reporting(E_ALL^E_NOTICE);
    $client=new bt_client($_REQUEST['cust_no']);
    //--------------------------------------------
    //$client->extend_relationship();
    $rel=$client->get_relationship();
    $rel_array=array('TITULAR','UNICA','PRIMA','A DOUA','ADOUA','EXCEPTII','REPREZ_LEGAL','reprez_leg');
    $data['rows']=array();
    for($i=0;$i<count($rel);$i++){
        if (strlen(trim($rel[$i]['CUSTOMER']))==7){

            if (in_array($rel[$i]['RELATIONSHIP'],$rel_array,true)){
                $row=array();

                $row['id']=$rel[$i]['CUSTOMER'];
                $row['data']=array($rel[$i]['CUSTOMER'],$rel[$i]['DESCP'],$rel[$i]['RELATIONSHIP']);
                $data['rows'][]=$row;
            }

        }
    }
    echo json_encode($data);


}
if ($_REQUEST['op']=='clientReprezentantCombo'){
    error_reporting(E_ALL^E_NOTICE);
    $client=new bt_client($_REQUEST['cust_no']);
    //--------------------------------------------
    //$client->extend_relationship();
    $rel=$client->get_relationship();
    $rel_array=array('TITULAR','UNICA','PRIMA','A DOUA','ADOUA','EXCEPTII','REPREZ_LEGAL','reprez_leg');
    $data['options']=array();
    for($i=0;$i<count($rel);$i++){
        if (strlen(trim($rel[$i]['CUSTOMER']))==7){

            if (in_array($rel[$i]['RELATIONSHIP'],$rel_array,true)){
                $row=array();
                $row['value']=$rel[$i]['CUSTOMER'];
                $row['text']=array("c1"=>$rel[$i]['CUSTOMER'],"c2"=>$rel[$i]['DESCP'],"c3"=>$rel[$i]['RELATIONSHIP']);
                $data['options'][]=$row;
            }

        }
    }
    echo json_encode($data);


}
if ($_REQUEST['op']=='clientData'){
    $client=new bt_client($_REQUEST['CUSTOMER_NO']);
    $fdata=$client->get_all_client_data();
    $ci=$client->get_client_CI();
    $data=array(
        "FIRST_NAME"=>$fdata['Custpersonal']['FSTNAME'],
        "LAST_NAME"=>$fdata['Custpersonal']['LSTNAME'],
        "CUSTOMER_TYPE"=>$fdata['CTYPE']=='I'?'PF':'PJ',
        "SEX"=>$fdata['Custpersonal']['SEX'],
        "RESIDENT_STATUS"=>$fdata['Custpersonal']['RESSTATUS'],
        "EMPLOYER"=>$fdata['Custpersonal']['Custprof'][0]['CURREMP'],
        "STAFF"=>$fdata['SSTAFF'],
        "CUTOMER_NAME1"=>$fdata['NAME'],
        "CUSTOMER_NO"=>$fdata['CUSTNO'],
        "SHORT_NAME"=>$fdata['SNAME'],
        "CUSTOMER_CATEGORY"=>$fdata['CCATEG'],
        "DATE_OF_BIRTH"=>$fdata['Custpersonal']['DOB'],
        "EMAIL"=>$fdata['Custpersonal']['EMAIL'],
        "MOBILE_NUMBER"=>$fdata['Custpersonal']['MOBNUM'],
        "ADRESS_LINE"=>$client->get_client_adress(),
        "DOC_TYPE"=>$ci[0],
        "DOC_SERIA"=>$ci[1],
        "DOC_NR"=>$ci[2],
        "DOC_ELIB"=>$ci[3],
        "DOC_EMIT"=>$ci['4'],
        "DOC_EXP"=>$ci['5']
    );
    if (isset($_REQUEST['forCust']) and isset($_REQUEST['forCustType'])){
        $data['reprezentant_photo']="cif=".$_REQUEST['forCust']."&type=".$_REQUEST['forCustType']."&cif_im=".$fdata['CUSTNO'];
    }
    echo json_encode($data);
}
