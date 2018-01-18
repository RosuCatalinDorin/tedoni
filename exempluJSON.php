<?php
/**
 * Created by PhpStorm.
 * User: gabriel.hossu
 * Date: 05/01/2018
 * Time: 10:24
 */

include('class.oracle.php');
include('config.php');

$ora = new dhtmlx_ora(); //::CreateInstance("XE", "olton", "yfnfkmz", "RUSSIAN_CIS.AL32UTF8");
$ora->Connect(ORA_DB, ORA_USER, ORA_PASS);

$ora->SetFetchMode(OCI_ASSOC);
$ora->SetAutoCommit(true);
error_reporting(E_ALL);
$sql='select id,eticheta from settings_refuz_reasons where parent=:idp';
$sql2='select id as "value",eticheta as "text", \'\'as reason from settings_refuz_reasons where parent=:idp';
$sql3='select id as "value",eticheta as "text" from settings_refuz_reasons where parent=:idp';
$res=$ora->Select($sql,array(":idp"=>0));
$rez=array();

$res=$ora->fetchAll($res);
for($i=0;$i<count($res);$i++) {
    $res2 = $ora->Select($sql, array(":idp" => $res[$i]['ID']));
    $res2 = $ora->fetchAll($res2);
    $rez[$res[$i]['ETICHETA']]=array();  //us on us
    for($j=0;$j<count($res2);$j++)
    {

        $res3=$ora->Select($sql2,array(":idp"=>$res2[$j]['ID']));
        $terminal=$ora->fetchAll($res3);
        for($k=0;$k<count($terminal);$k++){
            //print_r ($terminal[$k]);
            $res4=$ora->Select($sql3,array(":idp"=>$terminal[$k]['value']));

            $terminal[$k]['REASON']=$ora->fetchAll($res4);
        }
        $rez[$res[$i]['ETICHETA']][$res2[$j]['ETICHETA']]=$terminal;
    }
}
//echo '<pre>'.print_r($rez,true).'</pre>';
//echo "<br>end";
echo 'RefuzReason:'.json_encode($rez);