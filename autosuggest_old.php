<?

	$limit = 20;

	if (!isset($_REQUEST['R_RECH'])) exit;

/// Traitement de la chaine recu
	$R_RECH = Trim( $R_RECH );
	$R_RECH = str_replace (',', ' ', $R_RECH);
	$R_RECH = str_replace ('-', ' ', $R_RECH);
	$R_RECH = str_replace ('/', ' ', $R_RECH);
	$R_RECH = str_replace ('   ', ' ', $R_RECH);
	$R_RECH = str_replace ('  ', ' ', $R_RECH);
	$R_RECH = Trim( $R_RECH );

	$m = explode (' ' , $R_RECH );
	$input = Trim($m[count($m)-1]);

	If (strlen($input) <= 2 Or Count($m) > 1 ) exit;

	For ( $i=0 ; $i < count($m)-1 ; $i++ )
		$reste = $reste . ' ' . $m[$i];
	$reste = Trim ( $reste );

	require_once "dbconfig.php";

	mysql_connect(DB_HOSTNAME, DB_USERNAME, DB_PASSWORD) or die("Could not connect to host");
	mysql_select_db(DB_DATABASE) or die("Could not connect to database");

	// Select the data from the mysql

	// change below according to your own needs.

	$sql = "SELECT mot, occurence FROM mot2 WHERE mot LIKE '$input%' order by occurence desc LIMIT $limit";
 	$result = mysql_query($sql);

	if (!$result || !mysql_num_rows($result)) exit;

	include_once "headers.php";

 	echo "<response>";

	while ($row = mysql_fetch_array($result)) {
   			$keywords = str_replace ( "\n" , ' ' , $row[0]);
   			$keywords = str_replace ( "\r" , ' ' , $keywords );

   			echo "\n<keywords>" . $keywords . "</keywords>";
   			echo "<valua>$reste $keywords</valua>";

	}

 	echo "</response>";

?>
