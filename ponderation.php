<?
    Header  ("Cache-Control: max-age=60");
	Include ("commun/commun.php");

	if ( $POIDS =='' ) $POIDS = '9';

	if  ($GO != ''  ) {
		$ARTI = Str_Replace (',' , ' ' , $ARTI);
		$ARTI = Str_Replace (';' , ' ' , $ARTI);
		$ARTI = Str_Replace ("\t" , ' ' , $ARTI);
		$ARTI = Str_Replace ("\n" , ' ' , $ARTI);
		ForEach ( Explode (' ', $ARTI) as $val ) {
			$val = Trim($val ) ;

			If ( $val <> '' ) {

				$sql = "\nupdate arti_rech set AFF_POIDS=$POIDS Where ARTI='$val';";
				Execute ( $sql );
				$sql = "\nupdate olarti00 set ARWPRI=$POIDS Where ARSOCI='01' And  ARARTI='$val';";
				Execute ( $sql );
			}
		}

	}


?><!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<title>Mise a jour des ponderation articles</title>
	<link href=css/css1.css type=text/css rel=stylesheet />
    <script type="text/javascript" src="scripts/recherche.js"></script>
</head>

<body >
<h1>Mise à jour des ponderation articles</h1>
<form action=ponderation.php method=post>

ponderation de 0 à 9 <input name=POIDS size=2 value=<?= $POIDS ?>><br>

Liste d'article separé par "" ou "," ou ":"
<textarea name=ARTI rows=40 cols=20><?= $ARTI  ?></textarea>
<br><input type=submit name=GO value=' Et Hop '>


</form>
</body>