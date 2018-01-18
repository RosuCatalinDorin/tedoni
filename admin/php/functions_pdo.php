<?php
/**
 * Created by PhpStorm.
 * User: Paul.Sas
 * Date: 01/09/2017
 * Time: 12:43 PM
 */

function handlePDOError($query,$error_message){
    return $query." (".$error_message.")";
    return $error_message->getMessage();
}
function pdo_to_grid(&$sth,$cntr,$id){
    if (!isset($id)) $id=true;
    $res=array();$i=0;
    while ($row=$sth->fetch(PDO::FETCH_NUM)){

        $rw=array();
        if ($id===true) {$rw['id']=$row[0];unset($row[0]);}
        else {$i++;$rw['id']=$i;}
        $rw['data']=array();
        if ($cntr) $rw['data'][]='';
        $rw['data']=array_merge($rw['data'],$row);
        $res['rows'][]=$rw;
    };
    return $res;
}
function pdo_to_multicolumn_combo(&$sth){

    $res=array('options'=>array());
    while ($row=$sth->fetch(PDO::FETCH_ASSOC)){

        $rw=array();
        $rw['value']=$row['value'];unset($row[value]);
        $rw['text']=$row;

        $res['options'][]=$rw;
    };
    return $res;
}