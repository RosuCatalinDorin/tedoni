
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

    <!--CalendaTime -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css" />

    <link rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-material-design/0.5.10/css/bootstrap-material-design.min.css"/>
    <link rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-material-design/0.5.10/css/ripples.min.css"/>
    <link rel="stylesheet" href="./css/bootstrap-material-datetimepicker.css" />
    <link href='http://fonts.googleapis.com/css?family=Roboto:400,500' rel='stylesheet' type='text/css'>
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <script src="https://code.jquery.com/jquery-1.12.3.min.js" integrity="sha256-aaODHAgvwQW1bFOGXMeX+pC4PZIPsvn2h1sArYOhgXQ=" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-material-design/0.5.10/js/ripples.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-material-design/0.5.10/js/material.min.js"></script>

    <script type="text/javascript" src="http://momentjs.com/downloads/moment-with-locales.min.js"></script>
    <script type="text/javascript" src="./js/bootstrap-material-datetimepicker.js"></script>
    <script>
        (function(i, s, o, g, r, a, m) {
            i['GoogleAnalyticsObject'] = r;
            i[r] = i[r] || function() {
                    (i[r].q = i[r].q || []).push(arguments)
                }, i[r].l = 1 * new Date();
            a = s.createElement(o),
                m = s.getElementsByTagName(o)[0];
            a.async = 1;
            a.src = g;
            m.parentNode.insertBefore(a, m)
        })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

        ga('create', 'UA-60343429-1', 'auto');
        ga('send', 'pageview');
    </script>
<!-- Google Font -->
</head>

<style>

    .navbar {
        margin-bottom: 0;
        border-radius: 0;
    }

    /* Add a gray background color and some padding to the footer */
    footer {
        background-color: #ff002c;

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

<div class="container well">
    <div class="row">
        <div class="col-md-6">
            <div class="form-control-wrapper">
                <input type="text" id="date-ro" class="form-control floating-label" value="" placeholder="Alege data in care vrei sa faci rezervarea!">
            </div>
        </div>
    </div>
    <a  class="list-group-item list-group-item-action" style="width:150px;height: 40px" onclick="getReservation()">Cauta un loc liber!</a>
    </div>

    <div align="center">
        <div class="table-striped">
            <table class="table"  id="dateAppointments">
            <thead>
            <tr>
                <th>Firstname</th>
                <th>Ora stard</th>
                <th>Minut end</th>
                <th>Status</th>
            </tr>
            </thead>
            </table>
        </div>
    </div>
<script type="text/javascript">
    $(document).ready(function()
    {
        $('#date').bootstrapMaterialDatePicker
        ({
            time: false,
            clearButton: true
        });

        $('#time').bootstrapMaterialDatePicker
        ({
            date: false,
            shortTime: false,
            format: 'HH:mm'
        });

        $('#date-format').bootstrapMaterialDatePicker
        ({
            format: 'dddd DD MMMM YYYY - HH:mm'
        });
        $('#date-fr').bootstrapMaterialDatePicker
        ({
            format: 'DD/MM/YYYY HH:mm',
            lang: 'fr',
            weekStart: 1,
            cancelText : 'ANNULER',
            nowButton : true,
            switchOnClick : true
        });

        $('#date-end').bootstrapMaterialDatePicker
        ({
            weekStart: 0, format: 'DD/MM/YYYY HH:mm'
        });
        $('#date-start').bootstrapMaterialDatePicker
        ({
            weekStart: 0, format: 'DD/MM/YYYY HH:mm', shortTime : true
        }).on('change', function(e, date)
        {
            $('#date-end').bootstrapMaterialDatePicker('setMinDate', date);
        });

        $('#min-date').bootstrapMaterialDatePicker({ format : 'DD/MM/YYYY HH:mm', minDate : new Date() });

        $.material.init()
    });
</script>
</body>
<script>

    $('#date-ro').bootstrapMaterialDatePicker({ format : 'YYYY-MM-DD', lang : 'ro', weekStart : 1, cancelText : 'ANNULER' ,time: false});

    function getReservation() {
    var data1 = $('#date-ro').val();
    debugger;
        $('#dateAppointments').fadeIn().empty();
        $('#dateAppointments').fadeIn().append('  <thead>'+
           '<tr>'+
          '  <th>Firstname</th>'+
         '   <th>Start</th>'+
        '<th>End</th>'+
        '<th>Status</th>'+
        '</tr>'+
       ' </thead>')

        $.ajax({
        url:"load.php?op=getAppointments&data="+data1,
        method:"POST",

        success:function(data) {
            var obj = JSON.parse(data);

            obj.length;

            debugger;
            if (obj.length == 0){


                $('#dateAppointments').fadeIn().append('Nu au fost gasite rezervari pentru aceasta data:'+data1+', puteti alege ce ora dorit pentru programare!')
            }
            else {
                debugger;
                for (var i = 0; i <= obj.length - 1; i++) {
                    $('#dateAppointments').fadeIn().append(+
                            '</tbody>' +
                        '<tr>' +
                        '<th>' + obj[i].ora + ':' + obj[i].minu + '</th>' +
                        '<th>' + obj[i].ora + ':' + obj[i].minu + '</th>' +
                        '<th>' + obj[i].ora + ':' + obj[i].minu + '</th>' +
                        '<th>' + obj[i].status + '</th>' +
                        '</tr>' +
                        '</tbody>');
                }
            }
        }
    });


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
