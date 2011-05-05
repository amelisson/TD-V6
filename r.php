<?
    Header  ("Cache-Control: max-age=600");
	Include ("commun/commun.php");
	Include ("synonyme.php");

	If ( $PREF == 'O' ) Memo_Pref ();
	If ( $FRS  == '*' ) $FRS = '';

	Lire_Pref ();

	If ( $EFF != '' )  {
		$R_MARQ = $R_RECH = $R_DESI = $R_ARTI = $R_PGCATA  = $R_SECT = $R_NORME = $FRS = '';
		unset ( $_REQUEST );
		unlink ( "tmp/rech_$G_IP.xml"  );
		Calcul_Recherche ();
	}
	//// PRINT_R ( $_COOKIE);
	If ( $GO != '' )
		Calcul_Recherche ();

?><!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<title>TD recherche V6</title>
	<link href=css/css1.css type=text/css rel=stylesheet >
    <script type="text/javascript" src="scripts/recherche.js"></script>
	<script type="text/javascript" src="scripts/ajax.js"></script>
	<script type="text/javascript" src="scripts/tools.js"></script>
	<script type="text/javascript" src="scripts/bsn.AutoSuggest_c_2.0.js"></script>
	<link rel="stylesheet" href="css/autosuggest_inquisitor.css" type="text/css" media="screen" charset="utf-8" />
	<link rel="stylesheet" href="css/css1.css" type="text/css" media="screen" charset="utf-8" />

</head>

<body class="twoColElsLtHdr">

<div id="container">
  <div id="header">
    <h1>TD Recherche V6</h1>
  <!-- fin de #header --></div>
  <div id="sidebar1">
    <div id="SIDEBAR"></div>
    <p>&nbsp;</p>
    <div id='cadre_photo'></div>
  <!-- fin de #sidebar1 --></div>
  <div id="mainContent">

    <form name="frech" id="frech" method=post action=r.php>
    <input type=hidden id=VIG name=VIG value="<?= $VIG ?>" >
    <input type=hidden id=AVC name=AVC value="<?= $AVC ?>" >
    <input type=hidden id=FRS name=FRS value="<?= $FRS ?>" >
    <input type=hidden id=NRM name=NRM value="<?= $NRM ?>" >
    <input type=hidden id=SS  value="" >



<div class="wrapSearch">
  <div>
    Rechercher : <input value="<?= $R_RECH ?>" size=40 name="R_RECH" type="text" id="R_RECH"  onkeyup="autoSuggest(this.id, 'listWrap1', 'searchList1', 'R_RECH', event);" onkeydown="keyBoardNav(event, this.id);" />
    <input type=submit name=GO value='Et hop' > &nbsp; &nbsp;
    <span style="text-decoration: underline; font-size: 12px; color: #03F" onclick="affich('VIG');return false;"><b>&gt;</b>Vignette</span> &nbsp; &nbsp;

	<span style="text-decoration: underline; font-size: 12px; color: #03F" onclick="affich('TAB');return false;"><b>&gt;</b>Liste</span> &nbsp; &nbsp;

    <span style="text-decoration: underline; font-size: 12px; color: #03F" onclick="avance();return false;"><b>&gt;</b>Recherche avancé</span>

  </div>
  <div class="listWrap" id="listWrap1">
  <ul class="searchList" id="searchList1">
  </ul>
  </div>
</div>



   <div id=avance>
   <table>

  <tr>
   <td>
   Code article </td><td><input size=7 maxlength=8 name=R_ARTI value="<?= $R_ARTI ?>"> <i>à partir de </i>
   </td></tr>
   <?
   		$R_PGCATA = Trim ( Str_Replace ('-' ,  ' ', $R_PGCATA) );
   		$R_PGCATA = Str_Replace ('   ' ,  ' ', $R_PGCATA);
   		$R_PGCATA = Str_Replace ('  ' ,  ' ', $R_PGCATA);
   		$R_PGCATA = Str_Replace ('  ' ,  ' ', $R_PGCATA);
   		$tmp1 = explode (' ' , $R_PGCATA);
   		if ( count ( $tmp1 ) >= 2  ) {
   			$tmp = sPrintf ("<a href=r.php?AVC=B&GO=O&VIG=%s&R_PGCATA=%s-%d>[&lt;]</a>&nbsp;&nbsp;", $VIG, $tmp1[0], (integer) $tmp1[1]-1);
   			$tmp .= sPrintf ("<a href=r.php?AVC=B&GO=O&VIG=%s&R_PGCATA=%s-%d>[&gt;]</a>&nbsp;&nbsp;", $VIG, $tmp1[0], $tmp1[1]+1);
   		}
   ?>
   <tr>
   <td>
   Page de catalogue </td><td><input size=7 maxlength=8 name=R_PGCATA value="<?= $R_PGCATA ?>"> <i>9-17 ou 9 17 23 </i> <b><?= $tmp ?>
   </td></tr>

   <tr>
   <td>
   Secteur </td><td><select name=R_SECT>
     	<option value=''>Indifferent</option>
     <?
     	For ( $i=1 ; $i <= 11 ; $i++)
     		Printf("\n\t<option value=$i %s>${G_LS[$i]}</option>" , $i == $R_SECT ? 'selected' : ''  );
     ?>

     </select>
	</td>
	</tr>


   <tr>
   <td colspan=2>
	&nbsp;&nbsp;<input type=submit name=GO value='Et hop' > &nbsp; &nbsp; &nbsp;&nbsp;&nbsp;<INPUT TYPE="submit" NAME="EFF" VALUE="Efface">
	&nbsp; &nbsp; &nbsp;&nbsp;&nbsp;  <span style="text-decoration: underline; font-size: 12px; color: #03F" onclick="preference();return false;"><b>&gt;</b>Mes préferences</span>
    </table>
    </div>


    <div id=pref>

	<fieldset>
	<legend><i>Les préferences sont mémorisées pour la journée</legend>
	<table>


	<tr>
		<td align=right>Nombre maximal d'articles recherchés &nbsp;</td>
		<td><select id=MAX_ARTICLE >
		<option value=100  <? Echo $PREF->MAX_ARTICLE == '100' ? 'selected' : ''; ?>>100</option>
		<option value=200  <? Echo $PREF->MAX_ARTICLE == '200' ? 'selected' : ''; ?>>200</option>
		<option value=500  <? Echo $PREF->MAX_ARTICLE == '500' ? 'selected' : ''; ?>>500</option>
		<option value=1000 <? Echo $PREF->MAX_ARTICLE == '1000' ? 'selected' : ''; ?>>1000 &nbsp; </option>

		</select></td>
	</tr>

	<tr>
		<td align=right>Nombre d'articles en liste &nbsp;</td>
		<td><select id=MAX_LISTE >
		<option value=20  <? Echo $PREF->MAX_LISTE == '20' ?  'selected' : ''; ?>>20</option>
		<option value=50  <? Echo $PREF->MAX_LISTE == '50' ?  'selected' : ''; ?>>50</option>
		<option value=100 <? Echo $PREF->MAX_LISTE == '100' ? 'selected' : ''; ?>>100</option>
		<option value=200 <? Echo $PREF->MAX_LISTE == '200' ? 'selected' : ''; ?>>200 &nbsp; </option>
		</select></td>
	</tr>

	<tr>
		<td align=right>Nombre d'articles en vignette &nbsp;</td>
		<td><select id=MAX_VIGNETTE >
		<option value=12 <? Echo $PREF->MAX_VIGNETTE == '12' ? 'selected' : ''; ?>>12</option>
		<option value=24 <? Echo $PREF->MAX_VIGNETTE == '24' ? 'selected' : ''; ?>>24</option>
		<option value=36 <? Echo $PREF->MAX_VIGNETTE == '36' ? 'selected' : ''; ?>>36</option>
		<option value=48 <? Echo $PREF->MAX_VIGNETTE == '48' ? 'selected' : ''; ?>>48</option>
		<option value=72 <? Echo $PREF->MAX_VIGNETTE == '72' ? 'selected' : ''; ?>>72 &nbsp; </option>
		</select></td>
	</tr>

	<tr>
		<td align=right>N'afficher que les articles principaux &nbsp;</td>
		<td><select id=MAX_PERE >
		<option value='O' <? Echo $PREF->MAX_PERE == 'O' ? 'selected' : ''; ?>>Oui</option>
		<option value='N' <? Echo $PREF->MAX_PERE == 'N' ? 'selected' : ''; ?>>Non &nbsp; </option>

		</select></td>
	</tr>



	<tr>
		<td colspan=2><INPUT TYPE="button" onclick="memo_pref();return false;"  VALUE="Mémo">
	<tr>

	</table>
	</fieldset>
    </div>



    <div style="width:900px;" id="LISTEPRODUITS"></div><br>
    <? Echo $ERREUR; ?>
    </form>
	<!-- fin de #mainContent --></div>
	<br class="clearfloat" />
   <div id="footer">
    <p>Infitex Recherche de produits</p>
  <!-- fin de #footer --></div>
<!-- fin de #container --></div>

<script>

    sidebar ('');

	if ( document.getElementById('AVC').value == 'B' )
		document.getElementById('avance').style.display = 'block';




	var options_xml = {
		script:"autosuggest.php?",
		varname:"input",
		shownoresults: false,
		minchars: 3,
		timeout: 5000
	};
	var as_xml = new AutoSuggest('R_RECH', options_xml);
</script>

</body>
</html>




<?

Function Calcul_Recherche () {
Global $G_IP, $SYNONYME, $PREF, $ERREUR;;
// var_dump ( $_REQUEST );
	ForEach ( $_REQUEST AS $K=>$V ) {
		If ( ($K == 'R_RECH' Or $K == 'R_DESI' Or $K == 'R_NORME') And Trim($V) != '' )  {  /// Designation
		 	If ($SYNONYME[StrToLower($V)] != '')
              $V = $SYNONYME[StrToLower($V)];
			$SQL_DESI .= Where_Desi ($V);
		}

		If ( $K == 'R_ARTI' And Trim($V) != '' )    /// Code article
			$SQL_ARTI .= sPrintf (" And ARTI Like '%s%%' " , Trim($V));

		If ( $K == 'R_SECT' And Trim($V) != '' )    /// Secteur
			$SQL_SECT .= sPrintf (" And SECTEUR = %s " , Trim($V));

		If ( $K == 'R_MARQ' And Trim($V) != '' )    /// Secteur
			$SQL_FOUR .= sPrintf (" And FOUR = %s " , Trim($V));

		If ( $K == 'R_PGCATA' And Trim($V) != '' ) {  /// Page catalogue
			$V = Str_replace ('-' , ' ', Trim($V) );
			$V = Str_replace ('/' , ' ', $V);
			$V = Str_replace ('   ' , ' ', $V);
			$V = Str_replace ('  ' , ' ', $V);
			$MV = explode ( ' ', $V);
			If ( Count ( $MV ) == 2 )
				$SQL_CATA .= sPrintf (" And SECTEUR = %s And PAGE = %s",$MV [0], $MV [1] );
			If ( Count ( $MV ) == 3 )
				$SQL_CATA .= sPrintf (" And SECTEUR = %s And PAGE Between %s And %s ",$MV [0], $MV [1], $MV [2] );
		}
	}


	If ( Trim($SQL_ARTI . $SQL_DESI . $SQL_CATA . $SQL_SECT .$SQL_FOUR  ) == '' ) $SQL_ARTI=" And 1=2 ";

	$SQL=" SELECT arti_rech.* , olarti00.ARCDCL , olarti00.ARFOUR as FOUR , olarti00.ARPMIR as PMIR FROM arti_rech, olarti00 WHERE olarti00.ARCDCL In ('N', 'E') And ARSOCI='01' And ARARTI=ARTI And SECTEUR>=1
	$SQL_ARTI  $SQL_DESI $SQL_CATA $SQL_SECT $SQL_FOUR ";
	// $SQL .= " Order By SECTEUR , PAGE, TITRE, STITRE ";
	$SQL .= " Order By SECTEUR , ID_SUPER, AFF_POIDS Desc, TITRE, STITRE, MODELE ";
	$SQL .= " Limit " . (string) $PREF ->MAX_ARTICLE ;

//// ECHO " $SQL " ; ////////////////////////////////

	$f = fOpen ( "tmp/rech_$G_IP.xml" , 'w' );
	Query ( $SQL, $RES);
	fPrintf ( $f, "<?xml version=\"1.0\" encoding=\"ISO-8859-1\"?>\n<ITEM>");
	fPrintf ( $f, "\n<SQL_DESI>%s</SQL_DESI>", Code_Code( $_REQUEST ['R_RECH'] ) );
	$nb_ligne =  num_rows ( $RES);

	If  ( $nb_ligne == 0 )  {
		$ERREUR = "Il n'y a pas de reponse";
		return;
	}

	If  ( $nb_ligne >= (int) $PREF ->MAX_ARTICLE )  {
			$ERREUR = "Il y a trop de reponses<br><br>Precisez ....";
			return;
	}


	While( Fetch($RES, $R)) {
		$CPT ++;
		fPrintf ( $f, "\n<ITEMS>");
		fPrintf ( $f, "\n\t<ARTI>%s</ARTI>" , $R['ARTI'] );
 	    fPrintf ( $f, "\n\t<PERE>%s</PERE>" , $R['PERE'] );
		fPrintf ( $f, "\n\t<SECTEUR>%s</SECTEUR>" , $R['SECTEUR'] );
		fPrintf ( $f, "\n\t<PAGE>%s</PAGE>" , $R['PAGE'] );
		fPrintf ( $f, "\n\t<TITRE>%s</TITRE>" , Code_Code($R['TITRE']) );
		fPrintf ( $f, "\n\t<STITRE>%s</STITRE>" , Code_Code($R['STITRE']) );
		fPrintf ( $f, "\n\t<MODELE>%s</MODELE>" , Code_Code($R['MODELE']) );
		fPrintf ( $f, "\n\t<FOUR>%s</FOUR>" , $R['FOUR'] );
		fPrintf ( $f, "\n\t<SUPER>%s</SUPER>" , $R['id_super'] );
		fPrintf ( $f, "\n\t<PV>%.2f</PV>" , (double) ($R['PMIR']) * 1.4  );
		fPrintf ( $f, "\n\t<AFF_POIDS>%s</AFF_POIDS>" , $R['AFF_POIDS'] );

		$MPERE[ $R['PERE'] ]  ++; // Nombre
		$SPERE[ $R['PERE'] ]  = $R['id_super'] ; // Pere
		$PPERE[ $R['PERE'] ]  += $R['AFF_POIDS'] ==0 ? 1 : $R['AFF_POIDS'] * 20 ; // Poids

		// Fournisseurs
		$FOUR[ $R['FOUR'] ]++;
		// Norme

		/* N/A
		Query ("SELECT NONORM FROM olnora00 Where NOSOCI='01' AND NOARTI='${R['ARTI']}'", $RES6);
		While ( Fetch ( $RES6, $R6)) {
			$NORME[ $R6[0] ]++;
			fPrintf ( $f, "\n\t<NORME>%s</NORME>" , $R6[0] );
		}
		*/

		fPrintf ( $f, "\n</ITEMS>");
	}
	fPrintf ( $f, "\n<NB_PERES>%s</NB_PERES>\n",  Count($MPERE) );

	Foreach ( $MPERE As $k => $v ) {
		fPrintf ( $f, "\n<PERES>");
		fPrintf ( $f, "\n\t<ARTI>%s</ARTI>\n\t<NB>%s</NB>" , $k, $v  );
		fPrintf ( $f, "\n\t<SUPER>%s</SUPER>\n\t<POIDS>%s</POIDS>", $SPERE[$k], $PPERE[$k]);
		fPrintf ( $f, "\n</PERES>");
		}


	// Elimination des petits frs
	Foreach ( $FOUR As $k => $v )
		If ( $v < $CPT * .01 )
			Unset ( $FOUR[$k] );

	fPrintf ( $f, "\n\n<NB_FOURS>%s</NB_FOURS>\n",  Count($FOUR) );
	Foreach ( $FOUR As $k => $v ) {
		fPrintf ( $f, "\n<FOURS>");
		fPrintf ( $f, "\n\t<FOUR>%s</FOUR>", $k );
		fPrintf ( $f, "\n\t<NB>%s</NB>", $v );
		fPrintf ( $f, "\n\t<RAIS>%s</RAIS>", Code_Code( Fichier('F', $k , 'N' ) ) );
		fPrintf ( $f, "\n</FOURS>");
	}


/*  NA
	fPrintf ( $f, "\n\n<NB_NORME>%s</NB_NORME>\n",  Count($NORME) );
	Foreach ( $NORME As $k => $v ) {
		fPrintf ( $f, "\n<NORMES>");
		fPrintf ( $f, "\n\t<NORME>%s</NORME>", $k );
		fPrintf ( $f, "\n\t<NB>%s</NB>", $v );
		fPrintf ( $f, "\n\t<LIB>%s</LIB>", Code_Code('') );
		fPrintf ( $f, "\n</NORMES>");
	}
*/

	fPrintf ( $f, "\n<NB>%s</NB>\n\n</ITEM>", $CPT);
	fClose ( $f);


}


/*
	Retourne la clause sql de recherche
*/
Function Where_Desi ($DESI) {
// var_dump ( "Where_Desi ($DESI)" );
      ///// TEST ///////////////  6x80 ////
      $DESI = Trim(StrToUpper($DESI));
      $DESI = Str_Replace( "'", ' ', $DESI );
      $DESI = Str_Replace( '*', ' ', $DESI );
      $DESI = Str_Replace( '/', ' ', $DESI );
      ForEach (Explode(' ', $DESI) as $val)
      {

          $m = Explode('X', $val);
          If (Count($m) == 2 And Is_Numeric($m[0]) And Is_Numeric($m[1]))
              $DESI = Str_Replace($m[0] . 'X' . $m[1], $m[0] . ' ' . $m[1], $DESI);
      }

      ForEach (Explode(' ', $DESI) as $val)
          $WHERE .= Controle_Mot_V2($val);

      Return $WHERE;
 }


  Function Controle_Mot_V2($val) {
     Global $SYNONYME;

 ////// ECHO " Controle_Mot_V2 ( $val ) ";
     $val = StrToLower(Trim($val));
     if ($SYNONYME[$val] != '')
         $val = $SYNONYME[$val];

     $val = StrToUpper(Trim($val));
     If (strlen($val) < 2 and !Is_Numeric($val))
         return;

     For ($i = 0; $i < strlen($val) - 1; $i++)
     {
         $c = substr($val, $i, 1);

         If ($c == "É" Or $c == "È")
             $c = "E";
         If ($c == "À")
             $c = "A";
         If ($c == "Ç")
             $c = "";
         $rep .= $c;
     }
     $c = substr($val, $i, 1);
     If ($c == "É" Or $c == "È")
         $c = "E";
     If ($c == "À")
         $c = "A";
     If ($c == "Ç")
         $c = "C";
     // $rep .= $c;

     If (($c <> 'S' And $c <> 'X') Or $i < 5)
         $rep .= $c;

     If (Is_Numeric($rep) And StrLen($rep) <= 3)
         $tmp = " And TEXTE Like '% $rep %' ";
     If (Is_Numeric($rep) And StrLen($rep) > 3)
         $tmp = " And TEXTE Like '%$rep%' ";
     If (!Is_Numeric($rep))
         $tmp = " And TEXTE Like '% $rep%' ";


// var_dump ("Controle_Mot_V2($val)" , $tmp );
     Return $tmp;
 }



Function Memo_Pref () {
Global $G_IP, $_REQUEST;

	$f = fOpen ( "tmp/pref_$G_IP.xml" , 'w' );

	fPrintf ( $f, "<?xml version=\"1.0\" encoding=\"ISO-8859-1\"?>\n<PREF>");

	fPrintf ( $f, "\n\t<MAX_ARTICLE>%s</MAX_ARTICLE>" , $_REQUEST ['MAX_ARTICLE']  );
	fPrintf ( $f, "\n\t<MAX_LISTE>%s</MAX_LISTE>" , 	$_REQUEST ['MAX_LISTE']  );
	fPrintf ( $f, "\n\t<MAX_VIGNETTE>%s</MAX_VIGNETTE>" , $_REQUEST ['MAX_VIGNETTE']  );
	fPrintf ( $f, "\n\t<MAX_PERE>%s</MAX_PERE>" , $_REQUEST ['MAX_PERE']  );

	fPrintf ( $f, "\n</PREF>");
	fClose ( $f);

	Lire_Pref ();
}


Function Lire_Pref () {
Global $G_IP, $PREF, $_REQUEST ;


	If (File_Exists( "tmp/pref_$G_IP.xml" ))
	    $PREF = Simplexml_Load_File( "tmp/pref_$G_IP.xml" );
	Else {

		$_REQUEST ['MAX_ARTICLE']  	=  500;
		$_REQUEST ['MAX_LISTE']   	=  20;
		$_REQUEST ['MAX_VIGNETTE']	=  12;
		$_REQUEST ['MAX_PERE']		=  'N';

		Memo_Pref ();
		$PREF = Simplexml_Load_File( "tmp/pref_$G_IP.xml" );
	}


}

?>