
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
            success: function(data) {

/*

                $('#success').fadeIn().append(' ' +
                    '' +
                    ' <div class=\\"col-sm-3\\">\n' +
                    '                <h3>+' + data.name + '+</h3>\n' +
                    '                <img src=\\"' + data.img + '"\\" class=\\"img-circle\\" style=\\"width:140 , height:155\\" alt=\\"Image\\">+
                    '                <li><a href=\\localhost/adminstyleuser/detalii.php/\\">Vezi angajati</a></li>\n' +
                    '                </div>\n' +
                    '                ');
*/




            },
            error: function(e){
                console.log(e.message);
            }
        });

    });
});
