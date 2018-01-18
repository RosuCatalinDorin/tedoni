<?php
/**
 * Created by PhpStorm.
 * User: catalin.rosu
 * Date: 14/12/2017
 * Time: 10:23 AM
 *
 *
 */

session_start();

require_once('config.php');
$hostname = host;
$username = name;
$password = password;
$namedb = namedb;


$connect = mysqli_connect(host, name, password, namedb);
$query = "SELECT * FROM company";
$result = mysqli_query($connect, $query);
?>
<!DOCTYPE html>
<html lang="en">
<head>

    <title>T E D O N I</title>
    <meta name="description" content="">
    <meta name="author" content="">
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=Edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <link href="vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="css/bootstrap.min.css">
    <link rel="stylesheet" href="css/animate.css">
    <link rel="stylesheet" href="css/font-awesome.min.css">
    <link rel="stylesheet" href="css/owl.theme.css">
    <link rel="stylesheet" href="css/mycss.css">
    <!-- Main css -->
    <link rel="stylesheet" href="css/style.css">
<!-- Main css -->

</head>

<!-- Google Font -->
</head>

<style>

    .navbar {
        margin-bottom: 0;
        border-radius: 0;
    }

    /* Add a gray background color and some padding to the footer */
    footer {
        background-color: #f2f2f2;

        padding: 25px;
    }
</style>
<body class="body12">

<nav class="navbar navbar-inverse light" style="background-color: #0275d8;">
    <div class="container-fluid">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar" >
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="index.php">T E D O N I</a>
        </div>
        <div class="collapse navbar-collapse" id="myNavbar">
            <ul class="nav navbar-nav">
                <li class="active"><a href="index.php">Home</a></li>
                <li><a href="admin/index.php">Admin</a></li>
                <li><a href="#">Gallery</a></li>
                <li><a href="#">Contact</a></li>
            </ul>
            <ul class="nav navbar-nav navbar-right">

                <input type="button"  name="view" value="Conecteare " id="conect" class="btn view_data" />
                <input type="button"  name="view" value="Inregistre acum!"  id="inregistrare" class="btn inregistrare" />
                <input type="button"  name="view" value="Deconectare!" onclick="deconectare()"  id="deconectare" class="btn deconectare" />
            </ul>
        </div>
    </div>
</nav>
<div class="container">
<!-- Heading Row -->
<div class="row my-4">
    <div class="col-lg-8" id="imgGrand" >
    </div>
    <div class="col-lg-4">
        <h1 id="numeComapnie"></h1>
        <p id="telefonCompanie"></p>
        <p id="adresaComapnie"></p>
        <p id="tipComapnie"></p>
        <p id="detaliiComapnie"></p>
        <a class="btn btn-primary btn-lg" href="#">Call to Action!</a>
    </div>
</div>

<div>
    <div STYLE="float: left" id="service">
    </div>
    <!-- /.col-md-4 -->

</div>
</body>
<script>
    $(document).ready(function(){
        $('.view_data').click(function(){
            debugger;
            var employee_id = $(this).attr("id");
            $.ajax({
                url:"login.php",
                method:"post",
                data:{employee_id:employee_id},
                success:function(data){
                    $('#employee_detail').html(data);
                    $('#dataModal').modal("show");

                }
            });
        });
    });

</script>
<script>
    $(document).ready(function(){
        $('.inregistrare').click(function(){
            debugger;
            $.ajax({
                url:"inregistrare.php",
                method:"post",
                success:function(data){
                    $('#employee_detail').html(data);
                    $('#dataModal').modal("show");

                }
            });
        });
    });

</script>
<script>
    $(document).ready(function(){
        debugger;
        $.ajax({
            url:"load.php?op=getSesion",
            method:"post",

            success:function(data){
                var   obj = JSON.parse(data);
                debugger;
                if(obj==null) {
                    $('#deconectare').hide();
                }
                else   if(obj=='ok')
                {
                    $('#conect').hide();
                    $('#inregistrare').hide();
                    $('#deconectare').show();}

            }
        })

    });

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
                    $('#numeComapnie').fadeIn().append(obj[0].name);
                    $('#telefonCompanie').fadeIn().append("Tel :"+obj[0].phone);
                    $('#adresaComapnie').fadeIn().append("adresa: "+obj[0].address);
                    $('#tipComapnie').fadeIn().append("Tip: "+obj[0].type);
                    $('#detaliiComapnie').fadeIn().append("Detalii: "+obj[0].details);
                    $('#imgGrand').fadeIn().append(' <img class="img-fluid rounded" src="'+obj[0].imgGrand+'" alt="">');

            }
        });

    });

</script>
<script>
    $(document).ready(function(){
        debugger;
        $.ajax({
            url:"load.php?op=getServiceCompany",
            method:"Get",

            success:function(data){
                var   obj = JSON.parse(data);
                debugger;

                for(var i = 0 ; i<obj.length;i++)
                    $('#service').fadeIn().append(

                        '<div STYLE="  margin: 12px;float: left;background-color: rgba(255, 255, 255, 0.3); height: 250px;width: 300px;" class="card h-100" >'+
                        '<div class="card-body">'+
                        '<h2 style="color: #1e2022">'+obj[i].type+'<h2>' +
                        '<img src = "' + obj[i].img+ '" class="img-rounded" align="middle" alt="Smiley face" height="150" width="170">'+
                        '<p align="center">'+obj[i].description +'<p>' +
                        '<p>Pret:'+obj[i].price +' lei <p>' +
                          '</div>'  +
                        '<div class="card-footer">'+
                        ' <a style="float: button" href="companyReservation.php" class="list-group-item list-group-item-action">Cauta unloc liber</a>'+

                        '</div>' +
                        '</div>'
                    )





            }
        })

    });

</script>
<script>

    function deconectare () {
        debugger;
        $.ajax({
            url:"load.php?op=Deconectare",
            method:"post",
            success:function(data){

                alert('Deconectarea a fost realizata cu scces!');
                $('#deconectare').hide();
                $('#inregistrare').show();
                location.reload()

            }
        })
    }
</script>
<script src="login.js"></script>
</html>
