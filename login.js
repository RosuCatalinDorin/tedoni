$(document).ready(function() {
    $('form').submit(function(event) {
        var obj = {
            'op':'login',
            'mail': $('#mail').val(),
            'password': $('#password').val()
        };

        debugger;

        $('#userinvalid').fadeIn().empty();

        $.ajax({
            type: "GET",
            dataType: "json",
            url: "load.php?op=login&mail="+$('#mail').val()+"&password="+$('#password').val(),
            contentType: "application/json; charset=utf-8",
            success: function(data){
               if(data.status=='ok'){

                   $('#inregistrare').hide();
                   location.reload()
               }
               if(data.status== 'incorect'){

                   $('#userinvalid').fadeIn().append('' +
                       '<img src = "https://image.flaticon.com/icons/svg/190/190406.svg" style="float: left" class="img-circle" alt="eror" height="50" width="50">' +
                       '<h3 >Datele introduse nu sun valide!</h3>');
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
        event.preventDefault();
    });
});

/*
function getCompani() {


    $(document).ready(function() {
        $('form').submit(function(event) {
            var obj = {
                'op':'login',
                'mail': $('#mail').val(),
                'password': $('#password').val()
            };

            debugger;



            $.ajax({
                type: "GET",
                dataType: "json",
                url: "load.php?op=getCompanii",
                contentType: "application/json; charset=utf-8",
                success: function(data){

                    $('#success').fadeIn().append(' ' +
                        '' +
                        ' <div class=\\"col-sm-3\\">\n' +
                        '                <h3>'+data.name+'</h3>\n' +
                        '                <img src=\\"'+data.name+'"\\" class=\\"img-circle\\" style=\\"width:140 , height:155\\" alt=\\"Image\\">\n' +
                        '                <li><a href=\\"detalii.php\\">Vezi angajati</a></li>\n' +
                        '                </div>\n' +
                        '                ');




                },
                error: function(e){
                    console.log(e.message);
                }
            });
            event.preventDefault();
        });
    });
}*/
