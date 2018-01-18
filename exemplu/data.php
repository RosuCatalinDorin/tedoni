<?php
require_once('conn.php');
$var = array();
$sql = "SELECT * FROM `testComments` ORDER BY id DESC";
$result = mysql_query($sql);
	if(mysql_num_rows($result)){
		while ($row = mysql_fetch_assoc($result, MYSQL_ASSOC))  {
						$var[] = $row;
		}
	}
echo json_encode($var);   