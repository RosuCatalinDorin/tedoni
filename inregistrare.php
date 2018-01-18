
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Inregistrare cont</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script
    <script src ="css/bootstrap-grid.css"></script
    <script src ="css/bootstrap-reboot.css"></script
    <script src ="css/mycss.css"></script

</head>
<body>

<div class="container">
    <form method="post" name="postForm">
        <div class="row" >
            <div class="col-md-6">
                <h2 align="left">Inregistreaza un cont nou</h2>
                <label for="mail" class = "form-group">E-mail</label><br>
                <p id="mailinvalid"></p>
                <input type="text" onchange="checkMail()" name="mailIn" id="mail_In" class="form-control" style=" width:450px;"/>
                <label for="password" class = "form-group">Parola</label><br>
                <input type="password" name="password_In"  id="password" onchange="checkPass()" class="form-control" style=" width:450px;"/>
                <label for="passwordre" class = "form-group">Confirma parola</label><br>
                <input type="password" name="passwordre_In" onchange="checkPass()" id="passwordre" class="form-control"style=" width:450px;" />
                <p id="paassinvalid"></p>
                <label for="name" class = "form-group">Nume</label><br>
                <input type="text" name="name" id="nume" class="form-control" style=" width:450px;"/>
                <label for="prenume" class = "form-group">Prenume</label><br>
                <input type="text" name="prenume" id="prenume" class="form-control" style=" width:450px;"/>
                <label for="phone" class = "form-group">Telefon</label><br>
                <input type="text" name="phone" id="phone" class="form-control" style=" width:450px;"/>
                <label for="adresa" class = "form-group">Adresa</label><br>
                <input type="text" name="adresa" id="adresa" class="form-control" style=" width:450px;" /><br><br>
                <div class="row">
                    <div id="eroare"></div>
                </div>
                <input type= "submit" id="createuser" class="form-control" value="Inregistreaza cont" style=" width:450px;" />
    </form>
</div>

</body>


</html>
<script>
    function  checkMail()
    {
        $('#mailinvalid').fadeIn().empty();

        $(document).ready(function() {
            var obj = {
                'op':'checkMail',
                'mail': $('#mail_In').val(),

            };

            debugger;

            if ($('#mail_In').val().indexOf('@') > -1)
            {
                $.ajax({
                    type: "GET",
                    dataType: "json",
                    url: "load.php?op=checkMail&mail_In="+$('#mail_In').val(),
                    contentType: "application/json; charset=utf-8",
                    success: function(data){
                        if(data.status=='OK'){

                            debugger;

                            $('#createuser').prop("disabled", false);

                        }    if(data.status=='EXISTA'){

                            // alert("Userul este corect.")
                            $('#mailinvalid').fadeIn().append('<p>Exista deja un cont creat pe aceasta adresa de mail</p>');
                            $('#createuser').prop("disabled", true);
                        }
                        if(data.status== 'incorect'){

                            $('#userinvalid').fadeIn().append('' +
                                '<img src = "https://image.flaticon.com/icons/svg/190/190406.svg" style="float: left" class="img-circle" alt="eror" height="50" width="50">' +
                                '<h3 >Datele introduse nu sun valide!</h3>');
                            $('#createuser').prop("disabled", true);
                        }
                        if(data.status== 'err')
                        {
                            $('#userinvalid').fadeIn().append(
                                '<img src = "https://image.flaticon.com/icons/svg/653/653264.svg"  class="img-circle" alt="Smiley face" height="50" width="50">'+
                                '<h3 style="float: right">Eroare conectare la baza de date!</h3><br>');
                            $('#createuser').prop("disabled", true);
                            // alert("Datele introduse nu sunt corecte sau utilizatorul nu exista")
                        }



                    },
                    error: function(e){
                        console.log(e.message);
                    }
                });
            }

           else {
                $('#mailinvalid').fadeIn().append('<p>Adresa de mail nu este valida</p>');
                $('#createuser').prop("disabled", true);

            }


        });
    }

</script>
<script>
    function  checkPass()
    {
        $('#paassinvalid').fadeIn().empty();

        $(document).ready(function() {
            debugger
            var pas = $('#password').val();
            var pasre = $('#passwordre').val();

            if(pas == pasre)
            {
                //  $('#paassinvalid').fadeIn().append('<p>Exista deja un cont creat pe aceasta adresa de mail</p>');
                $('#password').css('background-color:blue');
            }
            else {
                $('#paassinvalid').fadeIn().append('<p>Parolele coincid</p>');



            }






        });
    }

</script>

<script src="inregistrare.js"></script>
