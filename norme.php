<?
	Include ("commun/commun.php");

 	Query ("select * from olflag00", $S);
 	$f =  fopen ("olnora00.sql" ,"w");
 	While ( fetch ( $S, $R )) {
 		If ( Trim($R['FLVALUE']) == '' ) $R['FLVALUE'] ='O';
 		fprintf ($f ,"insert into OLNORA00 ( NOSOCI, NOARTI, NONORM, NOVALR) Values ('01' ,'%s', '%s', '%s')\n",
 			$R['FLARTI'], $R['FLFLAG'], $R['FLVALUE']);
 	}

	fclose ( $f );
?>