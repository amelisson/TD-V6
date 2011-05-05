<?



/**
* Reservoir à fonction
* <br> Doit etre inclus partout
 * @author Antoine MELISSON <amelisson@infitex.fr>
 * @version 1.0
 * @package Commun
*/



Function Oui_Non ( $Nom_Zone, $Value ) {
Global  $G_INTERRO, $T ;

	If ( $T == 'V' )
		$tmp = ' DISABLED  ';

	If (   $Value == 'o' or  $Value == 'O' or trim($Value)=='') $chk_oui = ' CHECKED '; else $chk_non = ' CHECKED ';
	Echo "\n<TABLE>\n<TR>\n";
	Echo "\n\t<TD><INPUT TYPE=RADIO VALUE=O NAME=$Nom_Zone $chk_oui $tmp > Oui </TD>";
	Echo "\n\t<TD><INPUT TYPE=RADIO VALUE=N NAME=$Nom_Zone $chk_non $tmp > Non </TD>";
 	If (  $G_INTERRO == '1' ) Echo "\n\t<td><INPUT TYPE=RADIO NAME=$Nom_Zone VALUE=\"\" > Indifferent </TD>";
 	Echo "</TR>\n</TABLE>\n";
}


Function Oui_Non_V2 ( $Nom_Zone, $Value ) {
Global  $G_INTERRO, $T ;

	If ( $T == 'V' )
		$tmp = ' DISABLED  ';

	If (   $Value == 'o' or  $Value == 'O' or trim($Value)=='') $chk_oui = ' CHECKED '; else $chk_non = ' CHECKED ';

	Echo "\n\t <INPUT TYPE=RADIO VALUE=O NAME=$Nom_Zone $chk_oui $tmp > Oui  ";
	Echo "\n\t <INPUT TYPE=RADIO VALUE=N NAME=$Nom_Zone $chk_non $tmp > Non  ";
 	If (  $G_INTERRO == '1' ) Echo "\n\t<td><INPUT TYPE=RADIO NAME=$Nom_Zone VALUE=\"\" checked> Indifferent  ";

}







Function Param ( $Prefix , $Val_Prefix , $Nom_Zone, $Value   ) {
Global $G_SOCI, $G_INTERRO, $T, $G_CLIE, $G_DIR_TEMP;

	$SQL="SELECT PRARGU,PRLIBT FROM olprmpf WHERE PRSOCI='$G_SOCI' AND PRTYPT ='$Prefix ' AND PRNUMT=$Val_Prefix
	 ORDER BY PRLIBT";
	// echo "$Prefix , $Val_Prefix , $Nom_Zone, $Value   $SQL $T $G_INTERRO";
	If ( $T == 'V' ) {
			$SQL="SELECT PRARGU,PRLIBT FROM olprmpf WHERE PRSOCI='$G_SOCI' AND PRTYPT ='$Prefix ' AND PRNUMT=$Val_Prefix and PRARGU='$Value' ";
			Query ( $SQL , &$RES); Fetch($RES , &$ROW );
			Printf ("<INPUT  VALUE=\"%s %s\" SIZE=30  CLASS=READONLY READONLY>" , $ROW[0] ,  Ucfirst(Strtolower($ROW[1])));
			Return;
		}
	Echo "\n<SELECT SIZE=3 NAME=$Nom_Zone $tmpo >";
	If ( $G_INTERRO  == 1 )  echo "\n<OPTION value=\"\">Indifférent</OPTION>";
	$name_offile = sPrintf("$G_DIR_TEMP/tmp_param_%s_%s_%s.tmp", $G_SOCI, $Prefix, $Val_Prefix);

//	If ( $G_CLIE == 'FORNORD' ) $name_offile = sPrintf("D:\\clients\\fornord\\tmp\\tmp_param_%s_%s_%s.tmp", $G_SOCI, $Prefix, $Val_Prefix);

	$handle1 = fopen ( $name_offile , 'r');
	// var_dump ($name_offile );var_dump ($handle1);
	If ( ! $handle1 )  {
		$handle2 = fopen ( $name_offile , 'w'); var_dump ($handle2);
		Query ( $SQL , &$RES);
		While( Fetch($RES , &$ROW ))  {
			$sel=''; if ( $ROW[0] == $Value ) $sel = " SELECTED " ;
			Echo "\n<OPTION $sel VALUE=\"". $ROW[0]  . "\">" . Ucfirst(Strtolower($ROW[1]))." - "  . $ROW[0]. "  </OPTION>";
			Fwrite ($handle2, "<OPTION VALUE=\"". $ROW[0]  . "\">" . Ucfirst(Strtolower($ROW[1]))." - "  . $ROW[0]. "  </OPTION>\n");
		}
		Fclose ( $handle2 );
	} Else {
		While (!feof ($handle1)) {
		    $buffer = trim(fgets($handle1, 4096));
		    If ( $buffer == '' ) continue;
		    $i = strpos ( $buffer, '"', 16);
			$v = substr ( $buffer, 15, $i-15 );
			If ( $v == $Value ) echo str_replace ('<OPTION ', "\n<OPTION SELECTED ", $buffer); else echo "\n$buffer";
  		}
		Fclose ( $handle1 );

	}
	Echo "\n</SELECT>";
}





Function ParamS1 ( $Prefix , $Val_Prefix , $Nom_Zone, $Value   ) {
Global $G_SOCI, $G_INTERRO, $T;

	$SQL="SELECT PRARGU,PRLIBT FROM olprmpf WHERE PRSOCI='$G_SOCI' AND PRTYPT ='$Prefix ' AND PRNUMT=$Val_Prefix
	 ORDER BY PRLIBT";

	If ( $T == 'V' ) {
			$SQL="SELECT PRARGU,PRLIBT FROM olprmpf WHERE PRSOCI='$G_SOCI' AND PRTYPT ='$Prefix ' AND PRNUMT=$Val_Prefix and PRARGU='$Value' ";
			Query ( $SQL , &$RES); Fetch($RES , &$ROW );
			Printf ("<INPUT  VALUE=\"%s %s\" SIZE=30  CLASS=READONLY READONLY>" , $ROW[0] ,  Ucfirst(Strtolower($ROW[1])));
			Return;
		}
	Echo "\n<SELECT SIZE=1 NAME=$Nom_Zone $tmpo >";
	If ( $G_INTERRO  == 1 )  echo "\n<OPTION value=\"\">Indifférent</OPTION>";
	$name_offile = sPrintf("/www/tmp/tmp_param_%s_%s_%s.tmp", $G_SOCI, $Prefix, $Val_Prefix);
	$handle1 = fopen ( $name_offile , 'r');
	If ( ! $handle1 )  {
		$handle2 = fopen ( $name_offile , 'w');
		Query ( $SQL , &$RES);
		While( Fetch($RES , &$ROW ))  {
			$sel=''; if ( $ROW[0] == $Value ) $sel = " SELECTED " ;
			Echo "\n<OPTION $sel VALUE=\"". $ROW[0]  . "\">" . Ucfirst(Strtolower($ROW[1]))." - "  . $ROW[0]. "  </OPTION>";
			Fwrite ($handle2, "<OPTION VALUE=\"". $ROW[0]  . "\">" . Ucfirst(Strtolower($ROW[1]))." - "  . $ROW[0]. "  </OPTION>\n");
		}
		Fclose ( $handle2 );
	} Else {
		While (!feof ($handle1)) {
		    $buffer = trim(fgets($handle1, 4096));
		    If ( $buffer == '' ) continue;
		    $i = strpos ( $buffer, '"', 16);
			$v = substr ( $buffer, 15, $i-15 );
			If ( $v == $Value ) echo str_replace ('<OPTION ', "\n<OPTION SELECTED ", $buffer); else echo "\n$buffer";
  		}
		Fclose ( $handle1 );

	}
	Echo "\n</SELECT>";
}





Function Param_Aff ( $types , $numero , $argu) {
Global $G_SOCI;

	$SQL = "SELECT PRLIBT FROM olprmpf WHERE PRSOCI='$G_SOCI' and PRNUMT=$numero and PRTYPT='$types' and PRARGU='$argu'";
///	 echo $SQL;
	Query  ( $SQL , $RES8);
	Fetch  ( $RES8, $ROW8);
	Return  $ROW8[0] ;

}





Function Param1 ($numero, $types , $argu , $out='' ) {
Global $G_SOCI;

	$SQL = "SELECT PRLIBT FROM olprmpf WHERE PRSOCI='$G_SOCI' and PRNUMT=$numero and PRTYPT='$types' and PRARGU='$argu'";
	Query ( $SQL , &$RES);
	Fetch($RES , &$ROW );
	If ( $out == '' )
		echo "$argu - " . $ROW[0];
	else
		Return "$argu - ${ROW[0]}";

}




Function Fichier_C2 ( $CODE ) {
Global $G_SOCI;
		Query ( "SELECT CLRAIS, CLVILL FROM olclie00 Where CLSOCI='$G_SOCI' AND CLCLIE=$CODE" , $RES);
		If ( Fetch($RES , $ROW1 ))
			Return Ucfirst(Strtolower($ROW1[0])) . ' - ' . Ucfirst(Strtolower($ROW1[1]));
		Else
			Return '';
}



Function Stock ( $ARTI, $WHAT='THEO',  $DEPOT=''  ) {
GLOBAL $G_SOCI, $G_SOCI_STOCK ;

  If ( $DEPOT == '' )
	$SQL = "SELECT  SUM(ST$WHAT)
	FROM olstok00 Where  STSOCI =  '$G_SOCI' And STARTI='$ARTI' ";
  Else
	$SQL = "SELECT  SUM(ST$WHAT)
	FROM olstok00 Where  STSOCI =  '$G_SOCI' And STARTI='$ARTI' AND STDEPO='$DEPOT' ";

	Query ( $SQL, $res);  Fetch($res , $row  ); Return ( $row[0] );
}



Function Fichier_Href ($TYP, $CODE, $CODE2=0   ) {
GLOBAL $G_SOCI;

 // echo " Fichier_Href ($TYP, $CODE, $CODE2=0   ) ";
	Switch ($TYP) {

/////// COMMANDE D ACHATS ///////
		 Case "CA" :
		 	return  sPrintf( "<a href=\"/olymp/portefeuille_achat_detail.php?C=%s&R=%s\"><img src=/img/g.gif border=0>&nbsp;%s %s</a>$tmp"
		 	, $CODE, $CODE2, $CODE, $CODE2 );
		 break;


/////// COMMANDE DE VENTES ///////
		 Case "CV" :
		 	$SQL = Sprintf ("SELECT count(*)  FROM olmsge00 WHERE MESOCI='$G_SOCI' AND MECOMM=%s AND MERELI=%s", $CODE, $CODE2);

		 	Query ( $SQL, $R); Fetch($R, $C);
		 	If ( $C[0] > 0 )
		 		$tmp = "&nbsp;[R]";
		 	Else $tmp = '';

			$SQL = Sprintf ("SELECT EPSTADE  FROM olefac00 WHERE EPSOCI='$G_SOCI' AND EPCOMM=%s AND EPRELI=%s", $CODE, $CODE2);
			$SQL .= Sprintf (" Union SELECT EPSTADE  FROM olepor00 WHERE EPSOCI='$G_SOCI' AND EPCOMM=%s AND EPRELI=%s", $CODE, $CODE2);

			Query ( $SQL, $R); Fetch($R, $C);  //  echo "<br>$SQL";
			If ( $tmp == '' )
				$tmp .= sPrintf("&nbsp;<small><a href=/choix_stade.php>%s</A></small>",  SubStr($C[0], 0, 99) );
			Else
				$tmp .= sPrintf("&nbsp;<small><a href=/choix_stade.php>%s</A></small>",  SubStr($C[0], 0, 7) );

		 	return  sPrintf( "<a href=\"/olymp/portefeuille_detail_liste.php?C=%s&R=%s\">%s %s</a>$tmp"
		 	, $CODE, $CODE2, $CODE, $CODE2 );
		 break;


/////// FACTURE
		 Case "FA" :
		 	If ( $CODE != 0 )
		 		return  sPrintf( "<A HREF=\"/olymp/imp_facture.php?FACT=%s\">%s</a>", $CODE,  $CODE  );
		 	Else Return '';
		 break;

/////// BON DE LIVRAISON
		 Case "BL" :
		 	If ( $CODE != 0 )
		 		return  sPrintf( "<A HREF=\"/olymp/imp_bdl.php?BDL=%s\">%s</a>", $CODE,  $CODE  );
		 	Else Return '';
		 break;

////// FOURNISSEUR
		 Case "F" : $sql="SELECT FOFOUR As CLE, FOFOUR As CLEA, FORAIS As LIB FROM olfour00 WHERE FOSOCI='$G_SOCI' AND FOFOUR=$CODE";
		 $page = '/olymp/fourn_synthese.php?KEY=';
		 break;

////// CLIENTS
		 Case "C" : $sql="SELECT CLCLIE As CLE, CLCLIE As CLEA, CLRAIS As LIB FROM olclie00 WHERE CLSOCI='$G_SOCI' AND CLCLIE=$CODE";
		 $page = '/olymp/client_synthese.php?KEY=';
		 break;

////// CLIENTS
		 Case "C3" : $sql="SELECT CLCLIE As CLE, Concat( CLRAIS,' ',CLVILL)  FROM olclie00 WHERE CLSOCI='$G_SOCI' AND CLCLIE=$CODE";
		 Query ( $sql, $RES, 1 );
		 If ( Fetch( $RES, $ROW ) )
			return  "${ROW[0]} ${ROW[1]}" ;
		 else
			return "$CODE ~ ????";
		 break;


////// ADRESSE DE LIVRAISON
		 Case "AL" : $sql="SELECT Concat(ADCLIE, ',', ADCODE) As CLE, ADCODE As CLEA,  Concat(ADRAIS, ' ', ADVILL) As LIB FROM oladre00 WHERE ADSOCI='$G_SOCI' AND ADCLIE=$CODE AND ADCODE=$CODE2";
		 $page = '/olymp/adresse_modif.php?T=V&KEY=';
		 break;

////// ADRESSE DE LIVRAISON
		 Case "AL2" : $sql="SELECT  ADVILL as LIB, Concat(ADCLIE, ',', ADCODE) As CLE, ADCODE As CLEA FROM oladre00 WHERE ADSOCI='$G_SOCI' AND ADCLIE=$CODE AND ADCODE=$CODE2";
		 $page = '/olymp/adresse_modif.php?T=V&KEY=';
		 break;

////// ADRESSE DE LIVRAISON
		 Case "AL3" : $sql="SELECT Concat(ADRAIS, ' - ', ADVILL) FROM oladre00 WHERE ADSOCI='$G_SOCI' AND ADCLIE=$CODE AND ADCODE=$CODE2";
		 Query ( $sql, $RES, 1 );
		 If ( Fetch( $RES, $ROW ) )
			return  $ROW[0];
		 else
			return "$CODE ~ ????";
		break;

////// TRANSPORTEUR
		 Case "TR" : $sql="SELECT  TRRAIS as LIB FROM olatran00 WHERE TRSOCI='$G_SOCI' AND TRTRAN=$CODE ";
		 $page = '#';
		 break;

///// ARTICLE
		Case "A" : $sql="SELECT ARARTI As CLE, ARARTI As CLEA, Concat(ARDES1, ' ', ARDES2) As LIB FROM olarti00 WHERE ArSOCI='$G_SOCI' AND ARARTI='$CODE'";
		 $page = '/olymp/article_synthese.php?KEY=';
		 break;


///// ARTICLE
		Case "A3" :
		 $sql="SELECT ARARTI , Concat(ARDES1, ' ', ARDES2) , ARGENC , ARCOLNB1  FROM olarti00 WHERE ARSOCI='$G_SOCI' AND ARARTI='$CODE'";
		 Query ( $sql, $RES, 1 );
		 If ( Fetch( $RES, $ROW ) ) {
		 	XLS_Zone ( $ROW[0] ); XLS_Zone ( $ROW[1] ); XLS_Zone ( $ROW[2] , 'text0dec'); XLS_Zone ( $ROW[3] );
			return  ;
			}
		 else
			return ;
		break;

	}


	Query ( $sql, $RES, 1 );
	If ( Fetch( $RES, $ROW ) )
		return sprintf ("<a href=\"%s%s\"><img src=/img/g.gif border=0>&nbsp;%s</a>&nbsp;%s" , $page , $ROW['CLE'], $ROW['CLEA'], $ROW['LIB']  );
	else
		return "$CODE ~ ????";
}



Function Date_Livraison($COMM, $RELI ) {
Global $G_SOCI;

/// Date de livarison PAS FACTURER ALors dans epor
	$SQL ="(SELECT EPDLIV FROM olepor00 WHERE EPSOCI='$G_SOCI' AND EPCOMM=$COMM AND EPRELI=$RELI) ";

	Query ( $SQL, $RES, 1 );
	If ( Fetch( $RES, $ROW ) )
		return Date_Pres($ROW[0]);
	else
		return "$SQL $COMM,$RELI~ ????";

}



Function Fichier($typ, $code , $suite='' ) {
  ///  echo "\nFichier($typ, $code) ";
	global $G_SOCI, $G_K_BIB_EC ;
	if ( $code == '' Or $typ == '') return;
		Switch ($typ) {
			Case "USR" :
				$table="olymp_phpd.wbusrprf00";
				$cle="USREPR";
				$soci="USSOCI";
				$nom="Concat(USPRENOM,USNOM )";
				break;
			Case "F" :
				$table="olymp_d.olfour00";
				$cle="FOFOUR";
				$soci="FOSOCI";
				$nom="FORAIS";
				break;
			Case "C" :
				$table="olymp_d.olclie00";
				$cle="CLCLIE";
				$soci="CLSOCI";
				$nom="CLRAIS";
				break;
			Case "C1" :
				$table="olymp_d.olclie00";
				$cle="CLCLIE";
				$soci="CLSOCI";
				$nom="CLRAIS";
				break;
			Case "C2" :
				$tmp = Fichier_C2 ( $code );
				return $tmp;
				break;
			Case "A" :
				$table="olymp_d.olarti00";
				$cle="ARARTI";
				$soci="ARSOCI";
				$nom="ARDES1";
				$Q="'";
				break;
			Case "AS" :
				$table="olymp_d.olarti00";
				$cle="ARARTI";
				$soci="ARSOCI";
				$nom="ARSTOCKTHEO";
				$Q="";
				break;
			Case "D" :
				$table="olymp_d.oldepo00";
				$cle="DPCODE";
				$soci="DPSOCI";
				$nom="DPINTI";
				$Q="'";
				break;
			Case "T" :
				$table="olymp_tard.olctar00";
				$cle="CTTARI";
				$soci="CTSOCI";
				$nom="CTINTI, CTDATD";
				$Q="'";
				break;
			Case "R" :
				$table="olymp_d.olrepr00";
				$cle="REREPR";
				$soci="RESOCI";
				$nom="RENOMP";
				break;
			Case "TR" :
				$table="olymp_d.oltran00";
				$cle="TRTRAN";
				$soci="TRSOCI";
				$nom="TRRAIS";
				break;
		}

		$sql1 = "SELECT $nom FROM $table WHERE $soci='$G_SOCI' and $cle=$Q$code$Q";
		if ($typ == "T") $sql1 .= " and CTTYPE='P'";
////////   echo $sql1;
		Query ( $sql1 , $RES , 1 );
		If ( ! Fetch($RES , $ROW1 )) Return "$code - !!! ";

		If ( $suite == 'N' )
			Return  $ROW1[0];
		else
			Return "$code - " . $ROW1[0];

}



Function Ctl_Automatique( $Nom_Zone , $VALUES ) {

Global $G_OS, $G_SOCI, $G_INTERRO;

	$SQLD   = Sprintf ("SELECT * FROM dico Where DINOM_ZONE='%s'", SubStr( $Nom_Zone, 2,99));
	// var_dump ( $SQLD);
	Query ( $SQLD , &$RESD);
	If ( Fetch ( $RESD, &$ROWD )) {
		$fct 	= Trim($ROWD['DISAISIE']) ;
		$maju 	= Trim($ROWD['DIMAJ']) ;
		$type 	= Trim($ROWD['DITYPE']) ;
		$lg = $lg1= Trim($ROWD['DILG']) ;
		If ( $lg > 30 ) $lg1 = 30;


		$y = 'RN_' ;
		If ( $type == 'A' ) $y = 'RA_' ;
		If ( $type == 'B' ) $y = 'RB_' ;
		If ( $type == 'C' ) $y = 'RC_' ;
		If ( $type == 'E' ) $y = 'RE_' ;
		If ( $type == 'M' ) $y = 'RM_' ;


		If ( $type == 'D' ) {
		  	Printf ("\nDe &nbsp; <INPUT TYPE=TEXT NAME=RH_%s value=\"%s\" CLASS=inputCalendrier onfocus=\"calendrier.affiche(this)\">" ,
		  		$Nom_Zone , $GLOBALS["RH_$Nom_Zone"]  );
		 	Printf ("\n&nbsp; A &nbsp; <INPUT TYPE=TEXT NAME=RG_%s  value=\"%s\" CLASS=inputCalendrier onfocus=\"calendrier.affiche(this)\">" ,
		 		$Nom_Zone , $GLOBALS["RG_$Nom_Zone"] );
		 	return;
		}
		If ( $type == 'N' ) $y = 'RN_' ;

		If ( Trim($maju) != 'N' and ($y == 'RA_' Or $y == 'RB_' Or $y == 'RE_' Or $y == 'RD_' Or $y == 'RC_' ))	{
			$y = 'M' .  substr( $y, 1 ,3) ;
			$tmpo = " STYLE=\"TEXT-TRANSFORM: uppercase;\" ";
		}

		// $t = sPrintf ( "%s='%s';"   , '$val' , $GLOBALS["$y$Nom_Zone"] ) ;
		$t = sPrintf ( "%s=\"%s\";"   , '$val' , $GLOBALS["$y$Nom_Zone"] ) ;
		// var_dump ( $t);

		Eval ( $t);
		// Echo "<BR><BR>val $val"; Var_Dump ($t);

		If (  $fct != '' ) {
			If ( StrPos ( $fct , '(') > 0 )
				$tmp = sPrintf (" $fct , '$y$Nom_Zone', \"$val\"  ); ");
			else
				$tmp = sPrintf (" $fct ( '$y$Nom_Zone', \"$val\" );  ");

			// Echo "<BR><BR><BR><BR><BR><BR>"; Var_Dump ($tmp);

			Eval ( $tmp );
		} else {

			 Printf ("<INPUT NAME=%s VALUE=\"%s\" SIZE=$lg1 MAXLENGTH=$lg $tmpo >" , "$y$Nom_Zone", $val);

		}// $fct != ''
		}
		else {  // Par defaut
			$t = sPrintf ( "%s='%s';"   , '$val' , $GLOBALS["RA_$Nom_Zone"] ) ;
			eval ( $t);
			// Echo "<BR><BR>val $val $t"; Var_Dump ($t);
		 	Printf ("<INPUT NAME=RA_%s VALUE=\"%s\" SIZE=10 MAXLENGTH=10>" , $Nom_Zone, $val);
	}
}



Function Ctl_Automatique_Saisie ( $Nom_Zone , $VALUES ) {

Global $G_OS, $G_SOCI, $G_INTERRO, $T;

	If ( $T == 'V' ) $tmpo = " CLASS=READONLY READONLY ";
	$SQLD   = Sprintf ("SELECT * FROM dico Where DINOM_ZONE='%s'", SubStr( $Nom_Zone, 4, 99));


	Query ( $SQLD , &$RESD);
	If ( Fetch ( $RESD, &$ROWD )) {

		$fct 	= Trim($ROWD['DISAISIE']) ;
		$type 	= Trim($ROWD['DITYPE']) ;
		$lg 	= $lg1	= Trim($ROWD['DILG']) ;
		$maju 	= Trim($ROWD['DIMAJ']) ;
		$dec 	= Trim($ROWD['DIDECIMAL']) ;

		If ( $type == 'D' ) {
			$val = sprintf ("%02d/%02d/%04d", Substr( $VALUES, 6, 2),Substr( $VALUES, 4, 2),Substr( $VALUES, 0, 4));
		  	Printf ("\n<INPUT TYPE=TEXT SIZE=10 MAXLENGTH=10 NAME=%s ID=%s value=\"%s\" CLASS=inputCalendrier onfocus=\"calendrier.affiche(this);\">" ,
		  		Str_Replace('N_', 'D_', $Nom_Zone) ,Str_Replace('N_', 'D_', $Nom_Zone) , $val );
		 	return;
		}


		If ( Trim($maju) != 'N' )	$tmpo .= " STYLE=\"TEXT-TRANSFORM: uppercase;\" ";
		If ( $lg > 80 ) $lg1 = 64;


// printf ("$Nom_Zone '$maju'  '$tmpo' \n");
		$t = sPrintf ( "%s='%s';", '$val', str_replace( "'", '&acute;', $VALUES ));
		eval ( $t);
	   //  Echo "<BR><BR>VALUES=$VALUES val=$val"; Var_Dump ($t);

		If (  $fct != '' ) {
			If ( StrPos ( $fct , '(') > 0 )
				$tmp = sPrintf (" $fct , '$y$Nom_Zone', \"$val\"  ); ");
			else
				$tmp = sPrintf (" $fct ( '$y$Nom_Zone', \"$val\" );  ");

			// Echo "<BR><BR>"; Var_Dump ($tmp);

			Eval ( $tmp );
		} else {
			// var_dump ( $lg  );
			If ( $lg >=512 )
				Printf ( "<TEXTAREA ROWS=20 COLS=90 NAME=%s ID=%s $tmpo>%s</TEXTAREA> " , $Nom_Zone ,$Nom_Zone , $val);
			If ( $lg <512 And ($type == 'A' Or $type == 'B' Or $type == 'C'))
			 	Printf ( "<INPUT NAME=%s ID=%s VALUE=\"%s\" SIZE=$lg1 MAXLENGTH=$lg $tmpo> " , $Nom_Zone ,$Nom_Zone, $val);
			If ( $dec == 0  And ($type == 'N' Or $type == 'S' Or $type == 'P'))
			   	Printf ( "<INPUT NAME=%s ID=%s ONBLUR=\"Entier(this)\" VALUE=\"%s\" SIZE=10 MAXLENGTH=10 $tmpo>" , $Nom_Zone,$Nom_Zone, $val);
			If ( $dec != 0  And ($type == 'N' Or $type == 'S' Or $type == 'P'))
			   	Printf ( "<INPUT NAME=%s ID=%s ONBLUR=\"Nombre(this)\" VALUE=\"%s\" SIZE=10 MAXLENGTH=10 $tmpo>" , $Nom_Zone,$Nom_Zone, $val);
		}// $fct != ''

		}
		else {  // Par defaut
		If ( substr( $Nom_Zone,0 , 2 ) == 'N_' )
			Printf (          "<INPUT NAME=%s ID=%s ONBLUR=\"Entier(this)\" VALUE=\"%s\" SIZE=10 MAXLENGTH=10 $tmpo>" , $Nom_Zone,$Nom_Zone, $VALUES);
		If ( substr( $Nom_Zone,0 , 2 ) == 'D_' )
			Printf (          "<INPUT NAME=%s ID=%s ONBLUR=\"Nombre(this)\" VALUE=\"%s\" SIZE=10 MAXLENGTH=10 $tmpo>" , $Nom_Zone,$Nom_Zone, $VALUES);
		If ( substr( $Nom_Zone,0 , 2 ) == 'A_' Or substr( $Nom_Zone,0 , 2 ) == 'B_')
			Printf (          "<INPUT NAME=%s ID=%s VALUE=\"%s\" SIZE=10 MAXLENGTH=10 $tmpo>" , $Nom_Zone, $Nom_Zone, $VALUES);

	}
}




Function Date_Pres ( $dt , $code = 4 ) {
    If ($dt == 0) return '';
    if ( $code == 2)
	return sPrintf("%2s/%2s/%2s" , substr($dt, 6 ,2) , substr($dt, 4 ,2) , substr($dt, 2 ,2));

	return sPrintf("%2s/%2s/%2s" , substr($dt, 6 ,2) , substr($dt, 4 ,2) , substr($dt, 0 ,4));

}

Function Heure_Pres ( $hr , $t) {
 	$hr = substr('000000' . $hr, -6, 6);
	If ( $t=='') return sPrintf("%2s:%02s:%02s" , substr($hr, 0 ,2) , substr($hr, 2 ,2) , substr($hr, 4 ,2));
	If ( $t=='hm' Or $t=='HM') return sPrintf("%2s:%02s" , substr($hr, 0 ,2) , substr($hr, 2 ,2) );
}


Function Date_Inverse ($dt ) {
	$dt = str_replace ('/' , ' ' , $dt);
	$dt = str_replace ('-' , ' ' , $dt);
	$m = explode (' ', $dt);
	If ( $m[2] > 0 and $m[2]< 50 )  $m[2] +=2000;
	If ( $m[2] > 50 and $m[2] <= 99 )  $m[2] +=1900;

	return sPrintf("%04d%02d%02d" , $m[2] , $m[1] , $m[0]);
}






Function Lire_Xml ( $WHAT, $URL, $CLE  ) {
Global $G_DIR_TEMP;

	$F = "$G_DIR_TEMP/tmp_" . $_SERVER["REMOTE_ADDR"] . "_$WHAT.tmp" ;

	If (File_Exists($F)) {
			 $XML = new SimpleXMLElement('<a></a>');
   			 $XML = simplexml_load_file( $F );
    } else return;


	$resu .= sprintf ("\n<select name=$WHAT size=1 onchange=\"document.location.href = '$URL' + this.value\">");
	ForEach ( $XML->elem as $v) {

		If ( $tmp != '') {
			$tmp = '';
			$prev = sprintf("<a href=\"%s%s\"> %s &gt;</a>", $URL, $v->cle, $v->cle);
		}


		If ( $v->cle == $CLE ) {
			$bak = sprintf("<a href=\"%s%s\">&lt; %s</a>", $URL, $BAK, $BAK);
			$tmp = 'selected="selected"';
			$tmp = 'selected';
		}

		$resu .= sPrintf ("\n\t<option %s value=\"%s\"  >%s %s</option>", $tmp, $v->cle, $v->cle, $v->lib);
		$BAK =  $v->cle;
	}

	$resu .= sprintf ("\n</select>");

	If ( $WHAT == 'ARTI' )
		$resu2 = sPrintf ("&nbsp;Article :  <input ID=ARTI44 size=8 >
		&nbsp; <input type=button value=Go onclick=\"document.location.href = '$URL' + document.getElementById('ARTI44').value \">");

	return "$bak $resu $prev $resu2";
}


Function Fichier_super_secteur ( $SS ) {

		Query ("select LIB from super_secteur_v2 where ID_super_secteur_v2 = $SS", $RES );
		If ( Fetch ( $RES, $R ))  Return  $R[0];


}

?>
