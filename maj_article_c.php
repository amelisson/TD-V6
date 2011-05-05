<?
    Header  ("Cache-Control: max-age=60");
	Include ("commun/commun.php");


	Query ("select * from olarti99  where  99ARTI ='$ARTI'", $RESA); Fetch ( $RESA, $RA );
	Query ("select * from olarti00  where  ARSOCI='01' And ARARTI ='$ARTI'", $RESB); Fetch ( $RESB, $RB );


?><!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<title>Mise a jour  articles</title>
	<link href=css/css1.css type=text/css rel=stylesheet />
    <script type="text/javascript" src="scripts/recherche.js"></script>
</head>

<body >
</center>
<h1>Mise à jour  articles</h1>
<form action=maj_article_c.php method=post>

<div style="margin:20px; padding:20px; background-color:white; text-align: left; ">
Article : <input name=ARTI size=8 value="<?= $ARTI ?>"><br>
Deisgnation  : <input name=DESI size=78 value="<?= $RA['99DESI'] ?>"><br>
Ponderation  : <input name=POIDS size=8 value="<?= $RB['ARWPRI'] ?>"><br>

<br><br><br><br><br><br>et le reste alouette ....
</div>

</form>
</body>