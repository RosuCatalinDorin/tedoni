<?php

require_once('config.php');
$hostname = host;
$username = name;
$password = password;
$namedb = namedb;


$connect = mysqli_connect(host,$username, $password, $namedb);
$query = "SELECT * FROM employees";
$result = mysqli_query($connect, $query);
?>
<!DOCTYPE html>
<html>
<head>
    <title>Webslesson Tutorial | Bootstrap Modal with Dynamic MySQL Data using Ajax & PHP</title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js"></script>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" />
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
</head>
<body>
<br /><br />
<div class="container" style="width:700px;">
    <h3 align="center">Bootstrap Modal with Dynamic MySQL Data using Ajax & PHP</h3>
    <br />
    <div class="table-responsive">
        <table class="table table-bordered">
            <tr>
                <th width="10">Employee Name</th>
                <th width="5">View</th>
            </tr>
            <?php
            while($row = mysqli_fetch_array($result))
            {
                ?>
                <tr>
                    <td><?php echo $row["first_name"]." ".$row["last_name"] ?></td>
                    <td><input type="button" name="view" value="view" id="<?php echo $row["employee_id"]; ?>" class="btn btn-info btn-xs view_data" /></td>
                </tr>
                <?php
            }
            ?>
        </table>
    </div>
</div>
</body>
</html>
<div id="dataModal" class="modal fade">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Employee Details</h4>
            </div>
            <div class="modal-body" id="employee_detail">
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>
<script>
    $(document).ready(function(){
        $('.view_data').click(function(){
            var employee_id = $(this).attr("id");
            $.ajax({
                url:"select.php",
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
