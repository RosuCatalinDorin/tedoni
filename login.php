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
    <script src ="css/mycss.css"></script

</head>
<body>

<div class="container">
    <form method="post" name="postForm">
        <div class="row">
            <div class="col-md-6">
                <label for="mail" class = "form-group">E-mail</label><br>
                <input type="text" name="mail" id="mail" class="form-control" style="width: 450px"><br>
                <label for="comment" class = "form-group">Password</label><br>
                <input type="password" name="password" id="password" class="form-control" style="width: 450px"><br><br>
                <div class="row">
                    <div class="col-md-6" id="userinvalid"></div>
                </div>
                <input type= "submit" style="background-color:	rgba(0,211,0,0.34); width:450px; " class="form-control" value="Logi In">
                <br>
    </form>
</div>

</body>


</html>
<script src="login.js"></script>
