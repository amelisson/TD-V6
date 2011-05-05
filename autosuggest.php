<?
	$input = strtolower( $_GET['input'] );
	$input = Trim( $input );
	if ( strlen($input) <4 ) exit;

	Include ("commun/commun.php");
	Include ("synonyme.php");


	header ("Expires: Mon, 26 Jul 1997 05:00:00 GMT"); // Date in the past
	header ("Last-Modified: " . gmdate("D, d M Y H:i:s") . " GMT"); // always modified
	header ("Cache-Control: no-cache, must-revalidate"); // HTTP/1.1
	header ("Pragma: no-cache"); // HTTP/1.0
	header("Content-Type: text/xml");

	echo "<?xml version=\"1.0\" encoding=\"utf-8\" ?><results>";
	$sql = sprintf ( "select * from mot3 where mot like '%% %s%%' Limit 20",  $input);

	ForEach ( Explode (' ', $input ) as $val ) {
		If ($SYNONYME[StrToLower($val)] != '')
		              $val = $SYNONYME[StrToLower($val)];
		$input2 .= sprintf ("+%s* ", mysql_escape_string($val));
    }

	$input2 = trim($input2 );
	$sql = sprintf ( "SELECT id_mot3, mot,  Match (motsuite) Against ('%s' IN BOOLEAN MODE )
		FROM mot3 WHERE Match (motsuite) Against ('%s' IN BOOLEAN MODE )
		Order By 3 Desc Limit 20",
			 $input2,
			 $input2);

 // echo $sql;
 	Query ( $sql, $res);
	While (Fetch ( $res, $r))  {
			printf ( "\n<rs info=\"\" id=\"%s\" >%s</rs>", $r[0], codif5($r[1]));
		}
	echo "</results>";



function Codif5 ( $val ) {

	$tmp = utf8_encode(Trim($val));
	$tmp = str_replace ('&' , ' ', $tmp);
	return $tmp;
}
?>