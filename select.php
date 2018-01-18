<?php
if(isset($_POST["employee_id"]))
{
    $output = '';
    require_once('config.php');
    $hostname = host;
    $username = name;
    $password = password;
    $namedb = namedb;


    $connect = mysqli_connect(host,$username, $password, $namedb);
    $query = "SELECT * FROM employees";
    $query = "SELECT * FROM employees WHERE employee_id = 1";
    $result = mysqli_query($connect, $query);
    $output .= '  
      <div class="table-responsive">  
           <table class="table table-bordered">';
    while($row = mysqli_fetch_array($result))
    {
        $output .= '  
                <tr>  
                     <td width="30%"><label>Telefon</label></td>  
                     <td width="70%">'.$row["phone"].'</td>  
                </tr>  
                <tr>  
                     <td width="30%"><label>Address</label></td>  
                     <td width="70%">'.$row["address"].'</td>  
                </tr>  
                <tr>  
                     <td width="30%"><label>Type</label></td>  
                     <td width="70%">'.$row["type"].'</td>  
                </tr>  
                <tr>  
                     <td width="30%"><label>Mail</label></td>  
                     <td width="70%">'.$row["email"].'</td>  
                </tr>  
                <tr>  
                     <td width="30%"><label>Rating</label></td>  
                     <td width="70%">'.$row["rating"].' *</td>  
                </tr>  
                ';
    }
    $output .= "</table></div>";
    echo $output;
}
?>
