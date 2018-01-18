$(document).ready(function() {

    $('form').submit(function(event)

    {
        var obj = {
            'op':'inregistrare',
            'mail': $('#mail_In').val(),
            'password': $('#password').val(),
            'passwordre':$('#passwordre').val(),
            'nume':$('#nume').val(),
            'prenume': $('#prenume').val(),
            'phone': $('#phone').val(),
            'adresa': $('#adresa').val(),
        };

        if($('#password').val()!=$('#passwordre').val())
        {
            alert("parolele nu coincid");

        }
      else  if($('#password').val()== "")
        {
            alert("Va rog competati camupl de e-mail");

        }

        else    if($('#nume').val()== "")
        {
            alert("Va rog competati camupl cu numele dumneavoastra");

        }
        else    if($('#prenume').val()== "")
        {
            alert("Va rog competati camupl cu prenumele dumneavoastra");

        }
        else     if($('#phone').val()== "")
        {
            alert("Va rog competati camupl cu telefonul dumneavoastra");

        }
        else   if($('#adresa').val()== "")
        {
            alert("Va rog competati camupl cu adresa dumneavoastra");

        }



  else {

        $('#userinvalid').fadeIn().empty();

        $.ajax({
            type: "GET",
            dataType: "json",
            url: "load.php?op=inregistrare&mail="+$('#mail_In').val()+"&password="+$('#password').val()+"&nume="+$('#nume').val()+"&prenume="+$('#prenume').val()+"&phone="+$('#phone').val()+"&adresa="+$('#adresa').val(),
            contentType: "application/json; charset=utf-8",
            success: function(data){
                if(data.status=='OK'){

                    alert("Userul a fost creat cu succes.")
                    location.reload()
                }
                if(data.status== 'err')
                {

                    $('#userinvalid').fadeIn().append(
                        '<img src = "https://image.flaticon.com/icons/svg/653/653264.svg"  class="img-circle" alt="Smiley face" height="50" width="50">'+
                        '<h3 style="float: right">Eroare conectare la baza de date!</h3><br>');
                    // alert("Datele introduse nu sunt corecte sau utilizatorul nu exista")

                }



            },
            error: function(e){
                console.log(e.message);
            }
        });

        }
        event.preventDefault();
    });
});
