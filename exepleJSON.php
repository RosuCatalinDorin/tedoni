<?php
/**
 * Created by PhpStorm.
 * User: gabriel.hossu
 * Date: 05/01/2018
 * Time: 10:24
 */

include('config.php');

$hostname = host;
$username = name;
$password = password;
$namedb = namedb;

$connect = mysqli_connect(host,$username, $password, $namedb);
$query = "SELECT * FROM employees WHERE ";
$result = mysqli_query($connect, $query);
$result->fetch_all();
json_encode($result);

echo '<pre>'.print_r($result,true).'</pre>';
echo "<br>end";