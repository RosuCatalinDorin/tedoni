<?php
require('config.php');
error_reporting(E_ERROR);
function parse_num($k) {
    $p = 0;
    preg_match("/(\d{1,})([kmg]?)/i", trim($k), $r);
    if (isset($r) && isset($r[1])) {
        $p = $r[1];
        if (isset($r[2])) {
            switch(strtolower($r[2])) {
                case "g": $p *= 1024;
                case "m": $p *= 1024;
                case "k": $p *= 1024;
            }
        }
    }
    return $p;
};
function get_request_user($dom=false){
$cred = explode('\\',$_SERVER['REMOTE_USER']);
if (count($cred) == 1) array_unshift($cred, "(no domain info - perhaps SSPIOmitDomain is On)");
list($domain, $user) = $cred;
if (strlen(trim($user))<5) die('<span style="color:red">Utilizatorul dvs. nu este recunoscut! Va rugam contactati echipa de suport !!</span>');
    //if (strtolower($user)=='alexandru.sicoe') $user='ioanavirginia.petre';
    //if (strtolower($user)=='paul.sas') $user='rares.zurgalau';
    //if (strtolower($user)=='alexandra.craciun') $user='mihaela.stancu';
if ($dom) return $domain."\\".$user;
return strtolower($user);

}

function dquote($str){return str_replace("'","''",$str);}
function jdquote($str){return trim(preg_replace('/\r/','',preg_replace('/\n/', '\\u000a',addslashes($str))));}
function jdquote2($str){
    $str=str_replace("'",'\u2019',str_replace('"','\u201C',trim(preg_replace('/\r/','',preg_replace('/\n/', '\\u000a',$str)))));
    return preg_replace('/[\x00-\x1F\x80-\xFF]/', '',  $str);

}
function write_result($val){
    if (strpos($val,'<:-T-:>')  === false) echo "'".jdquote($val)."'";
    else {
        $val=explode('<:-T-:>',$val);
        echo "{'value':'".jdquote2($val[0])."','title':'".jdquote($val[1])."'}";
    }
}

function connect($con){
    //echo $con;
    if ($con=='Idebit'){
        $connection = @mssql_connect(Idebit, Idebit_USER,Idebit_PASS);
        $db = @mssql_select_db(Idebit_DB, $connection) ;
    }


    mssql_query("SET TEXTSIZE 2147483647");
    return $connection;
}
function query($sql){
    // echo $sql;
    if (!$r=mssql_query($sql)) die(mssql_get_last_message());
    else return $r;
}
function num_rows($rez){return mssql_num_rows($rez);}
function qdata($rez,$i,$camp){
    return mssql_result($rez,$i,$camp);
}
function result_to_json($sql,$proc=false){
    if ($proc) $rez=execute_procedure($sql);
    else $rez=query($sql);
    echo '{rows:[';
    if(mssql_num_rows($rez)>0){
        for($i=0;$i<mssql_num_rows($rez)-1;$i++){
            echo "{id:'".jdquote2(mssql_result($rez,$i,0))."',data:[";
            for($j=1;$j<mssql_num_fields($rez)-1;$j++)
            {
                write_result(mssql_result($rez,$i,$j));echo ",";

            }
            write_result(mssql_result($rez,$i,$j));

            echo "]},";
        }
        echo "{id:'".jdquote2(mssql_result($rez,$i,0))."',data:[";
        for($j=1;$j<mssql_num_fields($rez)-1;$j++){write_result(mssql_result($rez,$i,$j));echo ",";}
        write_result(mssql_result($rez,$i,$j));

        echo "]}";
    }
    echo "]}";
}


function get_user(){ return $_SESSION['EliberareID_user'];}
function get_user_unit(){ return $_SESSION['EliberareID_unit'];}
function get_user_name(){ return $_SESSION['EliberareID_name'];}
function get_user_title(){ return $_SESSION['EliberareID_title'];}
//TODO get_user_level : function get_user_level(){ return $_SESSION['EliberareID_level'];}

function get_statie()
{ return gethostbyaddr($_SERVER['REMOTE_ADDR']);}
function get_ip()
{return gethostbyname(gethostbyaddr($_SERVER['REMOTE_ADDR']));}

session_start();
/*if (!isset($_SESSION[EliberareID_user]) && $_POST['op']!='login') {
    echo json_encode(array('status'=>'requestLogin'));
    exit;
}*/

?>