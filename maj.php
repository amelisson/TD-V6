<?
	Include ("commun/commun.php");

	Execute("ALTER TABLE  arti_rech ADD  AFF_POIDS INT NOT NULL DEFAULT  '0' COMMENT  'Ponderation ordre affichage'", 1 );
	Execute("UPDATE arti_rech SET AFF_POIDS=0");
	Execute("UPDATE arti_rech, olarti00 SET AFF_POIDS=ARWPRI WHERE ARSOCI='01' AND ARARTI=ARTI And ARWPRI<>0 ");

	Execute("
	UPDATE arti_rech, super_secteur_v2
	Set ID_SUPER =	ID_SUPER_SECTEUR_V2
	where arti_rech.SECTEUR=super_secteur_v2.SECTEUR And PAGE >= DE And PAGE <= A And PAGE > 0 And arti_rech.SECTEUR between 1 And 11
	");


	Execute("Update arti_rech, olnora00 Set TEXTE=Concat(TEXTE, ' ', NONORM) Where NOSOCI='01' AND SOCI=NOSOCI AND NOARTI=ARTI");
?>