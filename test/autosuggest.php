<?php

$limit = 10;

if (!isset($_POST['R_RECH'])) exit;

$input = trim($_POST['R_RECH']);
If (strlen($input) < 3 ) exit;

require_once "dbconfig.php";

mysql_connect(DB_HOSTNAME, DB_USERNAME, DB_PASSWORD) or die("Could not connect to host");
mysql_select_db(DB_DATABASE) or die("Could not connect to database");

// Select the data from the mysql

// change below according to your own needs.

$sql = "SELECT  mot FROM  mot2  WHERE mot LIKE '$R_RECH%' LIMIT $limit";

$result = mysql_query($sql);

if (!$result || !mysql_num_rows($result))
exit;

include_once "headers.php";

echo "<response>";

while ($row = mysql_fetch_array($result))
{
   $keywords = $row['mot'];
   echo "<keywords>". $keywords ."</keywords>";
}

echo "</response>";

?>