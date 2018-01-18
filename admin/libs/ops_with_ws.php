<?php
  include ('ws.php');

if ($_REQUEST[op]=='close_account'){
    if ($_REQUEST[books])
        $a=explode(",",$_REQUEST[books]);
    else $a=explode(",","109210,109211");
    if (!$_REQUEST[cont]) $cont='018RONCRT0033852302';
    else  $cont=$_REQUEST[cont];

    echo "Check $new_acc CHQBOOK:";
    $op=new orn_insert_check($cont);
    if (!$op->getError()){
        echo $op->get_response_status()."<br>";
        echo "CHQBOOK:".$op->get_CHQBOOK()."<br>";

        if ($op->get_CHQBOOK()!='Y'){
            echo "setez CHQBOOK pe contul $cont:";
            $op=new orn_insert_set($cont);
            echo $op->get_response_status()."<br><br><Br>";
        }
        foreach($a as $b ){
            echo $cont." - ".$b."<br>";
            $p=new orn_check_book_modify($cont,$b,1,'Destroyed');
            if ($p->getError()) echo $p->getError()."<br>";
            else echo $p->get_response_status()."<br>";
            echo '--------------------------------------<br>';
        }

    }
    else echo $op->getError();


}
if ($_REQUEST[op]=='sold'){
    $a=new account($_REQUEST[cont]);
    if ($a->getError()) echo $a->getError();
    else {
        echo "Sold:".$a->get_avl_balance()."<br>";
        echo "Sold2:".$a->get_cur_balance()."<br>";
    }
}
if ($_REQUEST[op]=='client_accounts'){
    $a=new accounts($_REQUEST[idcl]);
    print_r_tree($a->get_response_body());
    echo "<br><Br>";
    print_r($a->getAccValType('ron','VBSG'));
}
if ($_REQUEST[op]=='client'){

    $a=new bt_client($_REQUEST[idcl]);
    print_r_tree($a->get_response_body());
}
if ($_REQUEST[op]=='activate_orn') {

    $orn = $_REQUEST[orn];
    $forn = $_REQUEST[forn];
    $old_acc=$_REQUEST[ocont];


    $op= new orn_change_status($old_acc,$orn,$forn,'N','Stopare eronata');
    if (!$op->getError()) echo $op->get_response_status()."<br>";
    else echo $op->getError();

}
if ($_REQUEST[op]=='modifcare_cont_orn'){

    $orn=$_REQUEST[orn];
    $old_acc=$_REQUEST[ocont];
    $new_acc=$_REQUEST[ncont];
    echo 'Stopare orn '.$orn." cont $old_acc:";
    $op = new orn_change_status($old_acc,$orn,1,'S','Eliberare eronata');
    if (!$op->getError()){
        echo $op->get_response_status()."<br>";
        echo "Check $new_acc CHQBOOK:";
        $op=new orn_insert_check($new_acc);
        if (!$op->getError()){
            echo $op->get_response_status()."<br>";
            echo "CHQBOOK:".$op->get_CHQBOOK()."<br>";
            if ($op->get_CHQBOOK()=='Y'){
                echo "inserez fila $orn pe cont $new_acc :";
                $op=new orn_insert($new_acc,'BTRL4NN',$orn,1);
                echo $op->get_response_status()."<br>";
            }
            else {
                echo "setez CHQBOOK pe contul $new_acc:";
                $op=new orn_insert_set($new_acc);
                if (!$op->getError()){
                    echo $op->get_response_status()."<br>";
                    echo "Check $new_acc CHQBOOK:";
                    $op=new orn_insert_check($new_acc);
                    if (!$op->getError()){
                        echo $op->get_response_status()."<br>";
                        echo "CHQBOOK:".$op->get_CHQBOOK()."<br>";
                        if ($op->get_CHQBOOK()=='Y'){
                            echo "inserez fila $orn pe cont $new_acc :";
                            $op=new orn_insert($new_acc,'BTRL4NN',$orn,1);
                            echo $op->get_response_status()."<br>";
                        }
                    }
                }
            }

        }
    }
    if ($op->getError()) echo $op->getError();

}

if ($_REQUEST[op]=='account'){

    $a=new accounts($_REQUEST[idcl]);
    print_r_tree($a->getAccValType('RON','CRT0'));
}
if ($_REQUEST[op]=='insert_orn'){
    require_once('../functions/base_functions.php');
    $cont=$_REQUEST[cont];
    ///////
    echo "Check $new_acc CHQBOOK:";
    $op=new orn_insert_check($cont);
    if (!$op->getError()){
        echo $op->get_response_status()."<br>";
        echo "CHQBOOK:".$op->get_CHQBOOK()."<br>";

        if ($op->get_CHQBOOK()!='Y'){
            echo "setez CHQBOOK pe contul $cont:";
            $op=new orn_insert_set($cont);
            echo $op->get_response_status()."<br><br><Br>";
        }
            echo 'inserting orn from '.$_REQUEST[start].", $_REQUEST[nr] files </br>";
            $a=new orn_insert($_REQUEST[cont],'BTRL4NN',$_REQUEST[start],$_REQUEST[nr]);
            if ($a->getError()) echo $a->getError();
            else echo $a->get_response_status();
            echo '</br>--------------------------------------</br>';


    }
    else echo $op->getError();

    /////////
//print_r_tree($a);
}
// 0724244
//[Custpersonal] => Array

if ($_REQUEST[op]=='close_account3'){
    require_once('../functions/base_functions.php');
    if (!$_REQUEST[cont]) $cont='018RONCRT0033852302';
    else  $cont=$_REQUEST[cont];

    //echo "Check $new_acc CHQBOOK:";
    $op=new orn_insert_check($cont);
    if (!$op->getError()){
        //echo $op->get_response_status()."<br>";
        //echo "CHQBOOK:".$op->get_CHQBOOK()."<br>";

        if ($op->get_CHQBOOK()!='Y'){
            //echo "setez CHQBOOK pe contul $cont:";
            $op=new orn_insert_set($cont);
            //echo $op->get_response_status()."<br><br><Br>";
        }
        $sql=" ora_getCheckBooks '$cont'";
       //echo $sql;
        sql_connect('SQL01');
        $rez=execute_procedure($sql);
        //echo  "<br><br>";
        for($i=0;$i<mssql_num_rows($rez);$i++){
            echo mssql_result($rez,$i,0)."-";
            $p=new orn_check_book_modify($cont,mssql_result($rez,$i,0),mssql_result($rez,$i,1),'Destroyed');

            if ($p->getError()) echo $p->getError();
            else echo $p->get_response_status();
            echo "\r\n";

        }

    }
    else echo $op->getError();


}
if ($_REQUEST[op]=='close_account2'){
    require_once('../functions/base_functions.php');
    if (!$_REQUEST[cont]) $cont='018RONCRT0033852302';
    else  $cont=$_REQUEST[cont];

    echo "Check $new_acc CHQBOOK:";
    $op=new orn_insert_check($cont);
    if (!$op->getError()){
        echo $op->get_response_status()."<br>";
        echo "CHQBOOK:".$op->get_CHQBOOK()."<br>";

        if ($op->get_CHQBOOK()!='Y'){
            echo "setez CHQBOOK pe contul $cont:";
            $op=new orn_insert_set($cont);
            echo $op->get_response_status()."<br><br><Br>";
        }
        $sql=" ora_getCheckBooks '$cont'";
        sql_connect('SQL01');
        $rez=execute_procedure($sql);
        echo  "<br><br>";
        for($i=0;$i<mssql_num_rows($rez);$i++){
            echo $cont." - ".mssql_result($rez,$i,0)."<br>";
            $p=new orn_check_book_modify($cont,mssql_result($rez,$i,0),mssql_result($rez,$i,1),'Destroyed');
            if ($p->getError()) echo $p->getError()."<br>";
            else echo $p->get_response_status()."<br>";
            echo '--------------------------------------<br>';
        }

    }
    else echo $op->getError();


}

if ($_REQUEST[op]=='check_cont'){
    require_once('../functions/base_functions.php');
    if (!$_REQUEST[cont]) $cont='018RONCRT0033852302';
    else  $cont=$_REQUEST[cont];

    echo "Check $new_acc CHQBOOK:";
    $op=new orn_insert_check($cont);
    if (!$op->getError()){
        echo $op->get_response_status()."<br>";
        echo "CHQBOOK:".$op->get_CHQBOOK()."<br>";

    }
    else echo $op->getError();


}
?>