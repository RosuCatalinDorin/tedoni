<?php
error_reporting(E_ERROR);
$t='v2.0';
require_once('php/functions.php');
require_once('php/_f_check_login.php');
?>
<!DOCTYPE html>
<html>
<head>
    <title>Mesaje <?php echo $t?></title>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <link rel="stylesheet" type="text/css" href="codebase/dhtmlx.css"/>

    <link rel="stylesheet" type="text/css" href="css/nprogress.css"/>
    <link rel="stylesheet" type="text/css" href="css/dhtmlx_ext.css<?php echo "?",$t; ?>"/>


    <script src="codebase/dhtmlx<?php if ($_REQUEST['debug']==1) echo '_max'?>.js"></script>


    <script src="js/dhtmlx_extension.js<?php echo "?",$t; ?>"></script>

    <script src="js/functions.js<?php echo "?",$t; ?>"></script>
    <script src="js/json2.js"></script>
    <script src="js/jquery-1.11.3.min.js"></script>

    <script src="js/inputmask.js"></script>
    <script src="js/jquery.inputmask.js"></script>

    <script src="js/script.js<?php echo "?",$t; ?>"></script>
    <script type="text/javascript">
        system.version='<?php echo $t ?>';
        system.auth=
            <?php
                 $auth=Array('user'=>$us);
                 echo json_encode($auth);
            ?>

    </script>
    <style>
        html, body {
            width: 100%;
            height: 100%;
            margin: 0;
            padding: 0;
            background-color: #ebebeb;
            overflow: hidden;
        }

    </style>
</head>
<body onload="doOnLoad();">

</body>
</html>