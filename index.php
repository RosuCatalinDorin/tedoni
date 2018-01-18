<?php
/**
 * Created by PhpStorm.
 * User: catalin.rosu
 * Date: 14/12/2017
 * Time: 10:23 AM
 *
 *
 */


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

    <!-- Google Font -->
    <link href='https://fonts.googleapis.com/css?family=Poppins:400,500,600' rel='stylesheet' type='text/css'>

</head>
<body class="body12">

<nav class="navbar navbar-inverse bg-inverse">
    <div class="container-fluid">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
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
                <br>
                <input type="button"  name="view" value="Inregistre acum!"  id="inregistrare" class="btn inregistrare" />
                <br>
                <input type="button"  name="view" value="Deconectare!" onclick="deconectare()"  id="deconectare" class="btn deconectare" />
            </ul>
        </div>
    </div>
</nav>
<div class="container-fluid bg-3 text-center">
    <h3 id="salut"></h3><br>
    <h2 class="col-lg-pull-1">Select </h2><br>
    <select class="form-control">
        <option value="volvo">Volvo</option>
        <option value="saab">Saab</option>
        <option value="mercedes">Mercedes</option>
        <option value="audi">Audi</option>
    </select>


    <div class="row" id="clienti">

    </div>
    <div>
        <div id="success"  style="float:left" ></div>
    </div>
</div><br>

<footer class="container-fluid text-center">
    <p>Footer Text</p>
</footer>
<div id="dataModal" class="modal fade">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h4 align="center" class="modal-title">T E D O N I</h4>
            </div>
            <div  id="employee_detail">
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" onclick="relode()" data-dismiss="modal">Close</button>
            </div>
        </div>
    </div class="modal-dialog">
</div>
</body>
<script>

    function relode() {
        location.reload();
    }
</script>
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
    $('#salut').fadeIn().empty();
         $(document).ready(function(){
            debugger;
            $.ajax({
                url:"load.php?op=getName",
                method:"GET",

                success:function(data) {
                    var obj = JSON.parse(data);
                    debugger;

                    if (obj == null) {
                        $('#salut').fadeIn().append('<p>Va rugam sa va conectati pentru a putea efectua o programare</p>');
                    }
                    else {
                        $('#salut').fadeIn().append('<p>Salut,' + obj + '!</p>');

                    }
                }
            });

    });

</script>
<script>
    $(document).ready(function(){
            $.ajax({
                url:"load.php?op=getCompanii",
                method:"post",
                success:function(data){
                  var   obj = JSON.parse(data);
            for(var i = 0; i<=obj.length - 1;i++) {

                $('#success').fadeIn().append(

                    '<div class="companii" style="float:left" href="detalii.php"> <br>' +
                        '<div>'+
                    '<img src = "' + obj[i].img+ '" class="img-circle" alt="Smiley face" height="100" width="120">'+
                    '<h3>' + obj[i].name+'</h3>'+
                        '<div>'+
                    '<li><a href="detalii.php">Vezi angajati</a></li> ' +
                    '<input type="button"   onclick="msg('+obj[i].company_id + ')" name="view" value="REZERVARE" id=" '+obj[i].company_id + '" class="btn makeRezBut"/>'+

                    '</div>'
                )
            }
                }
            });

    });
</script>
<script>

    function msg (company_id) {

        debugger;
        $.ajax({
            url:"reservation.php",
            method:"post",
            data:{employee_id:company_id},
            success:function(data){

                $('#employee_detail').html(data);
                $('#dataModal').modal("show");

            }
    })
    }

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
