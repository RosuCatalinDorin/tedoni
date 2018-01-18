$(document).ready(function() {
    $('form').submit(function(event) { 
        $('#name + .throw_error').empty(); 
        $('#comment + .throw_error').empty(); 
        $('#success').empty();
		
        var postForm = { 
            'name': $('#name').val(),
            'comments': $('#comment').val()
        };
        $.ajax({
            type: 'POST',
            url: 'submit.php',
            data: postForm,
            dataType: 'json',
            success: function(data) {
                console.log(data);
                if (!data.success) {
                    if (data.errors.name) {
                        console.log(data.errors.name);
                        $('#name + .throw_error').fadeIn(1000).html(data.errors.name);
                    }
                    if (data.errors.comments) {
                        console.log(data.errors.comments);
                        $('#comment + .throw_error').fadeIn(1000).html(data.errors.comments);
                    }
                } else {

                    $('#success').fadeIn(1000).append('<p>' + data.posted + '</p>');
                }
            }
        });
        event.preventDefault();
    });
});