<?
	Include ("commun/commun.php");

	Execute (
"CREATE TABLE IF NOT EXISTS mot3 (
  id_mot3 int(11) NOT NULL auto_increment,
  MOT varchar(255) NOT NULL,
  MOTSUITE Text,
  PRIMARY KEY  (id_mot3),
  UNIQUE KEY MOT (MOT),
  FULLTEXT (MOTSUITE)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1;", 1);

	Execute ("Truncate table mot3");

	$sql = "SELECT DISTINCT lib_titre FROM arbo";
	Query ( $sql, $res );
	While ( Fetch ( $res, $r )) {
		$sql = sPrintf( "insert  into mot3 set mot=' %s',  MOTSUITE=' %s' ", mysql_escape_string(Trim($r[0])), mysql_escape_string(Trim($r[0])));
		Execute ( $sql , 1);
	}



	$sql = "SELECT DISTINCT lib_stitre FROM arbo";
	Query ( $sql, $res );
	While ( Fetch ( $res, $r )) {
		$sql = sPrintf( "insert  into mot3 set mot=' %s',  MOTSUITE=' %s'", mysql_escape_string(Trim($r[0])), mysql_escape_string(Trim($r[0])));
		Execute ( $sql , 1);
	}



	$sql = "SELECT DISTINCT lib_modele FROM arbo";
	Query ( $sql, $res );
	While ( Fetch ( $res, $r )) {
		$sql = sPrintf( "insert  into mot3 set mot=' %s',  MOTSUITE=' %s'", mysql_escape_string(Trim($r[0])), mysql_escape_string(Trim($r[0])));
		Execute ( $sql , 1);
	}



?>