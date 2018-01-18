<?php
session_start();
  $_SESSION['id_company'] =$_POST['employee_id'] ;

if (!isset($_SESSION['sesiuneUser'])) {
header('Location: login.php');
exit();
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <title>Bootstrap Example</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script
    <script src ="css/bootstrap-grid.css"></script
    <script src ="css/bootstrap-reboot.css"></script

    <link rel="stylesheet" href="css/mycss.css">



</head>
<body>
<div align="center">
<div id="divcompanii" >
</div>

</body>



</html>
<script>
/*
    $(document).ready(function(){
        debugger;
        $.ajax({
            url:"load.php?op=getIdCompany",
            method:"POST",

            success:function(data) {
                var obj = JSON.parse(data);
                debugger;
                if (obj == null) {

                }
                else {

                   window.location('company.php');

                }
            }
        });

    });*/

</script>
<script>

    $(document).ready(function(){
        debugger;
        $.ajax({
            url:"load.php?op=getDetaliiCompany",
            method:"POST",

            success:function(data) {
                var obj = JSON.parse(data);
                debugger;
                for(var i = 0; i<=obj.length - 1;i++) {

                $('#divcompanii').fadeIn().append(
                    '<div>'+
                    '<h3 style="align="middle" >' + obj[i].name+'</h3>'+
                    '<img src = "' + obj[i].img+ '" class="img-circle" align="middle" alt="Smiley face" height="130" width="160">'+
                    '<h3>' + obj[i].details+'</h3> <br>' +
                    ' <a  href="company.php" class="list-group-item list-group-item-action">Cauta un loc liber</a>'+
                    '</div>'
                )
            }
            }
        });

    });

</script>
<script>
    function openWindow() {
        window.location('company.php')
    }
</script>

