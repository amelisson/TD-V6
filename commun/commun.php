<?
 	Session_Start();

	Include_once ('commun_cons.php');
	Include_once ('commun_td.php');
	Include_once ('commun_ctl.php');

// http://localhost/PHPDocumentor/docbuilder/builder.php?altuserdir=&setting_useconfig=&setting_filename=&setting_directory=D%3A%5CClients%5CDVPL2%5Ccommun%5C&setting_ignore=&setting_packageoutput=&setting_target=D%3A%5CClients%5CDVPL2%5Cdocu&setting_output=HTML%3ASmarty%3APHP&ConverterSetting=HTML%3ASmarty%3APHP&setting_title=Documentation+Olymp&setting_defaultpackagename=default&setting_defaultcategoryname=default&setting_customtags=&setting_sourcecode=on&interface=web&dataform=true

/**
*  Fonctions de base d'acces au DB
* <br> Définition des constantes importantes G_....
* <br> Doit etre inclus partout
* <br> Ce script commence par ouvrir un connecteur DB et définit des VARIABLES GLOBALES IMPORTANTES.
 * @author Antoine MELISSON <amelisson@infitex.fr>
 * @version 1.0
 * @package Commun
*/
 	;


setlocale (LC_ALL, 'en_EN');



/**
 * Query
 * Lance un ordre SQL de selection, lu par Fetch
 * <pre>Query ("select * from QGPL/OLPRMPF ..." , &$RES);</pre>
 * @param string $SQL Ordre Sql comme select update delete
 * @param string $recordSet Qui sera utilise dans le Fetch
 */

Function Query ( $SQL , &$res , $err=0 ) {
GLOBAL $G_DBH, $G_OS;

	If ( $G_OS == "LINUX" and  $err == 0)
		$res = mysql_query ( Biblio($SQL) , $G_DBH )
			or die ( "<br>$SQL<br> Probleme Query <br>" .mysql_error() ."<br>$SQL");

	If ( $G_OS == "LINUX" and  $err == 1)
		$res = mysql_query ( Biblio($SQL) , $G_DBH ) ;


	If ( $G_OS == "AS400" )
		$res = odbc_exec($G_DBH, $SQL)
			or die ( "<br>$SQL<br> Probleme Query <br>" .odbc_errormsg() ."<br>$SQL");

}


/**
 * Execute
 * Excution de l'ordre SQL
 * <pre>Execute ("delete from QGPL/OLPRMPF where..." );</pre>
 * @param string $SQL Ordre Sql comme select update delete
 */


Function Execute ( $SQL,  $err = 0  ) {
GLOBAL $G_DBH, $G_OS;

// echo "Execute ( $SQL,  $err  ) ";

	If ( $G_OS == "LINUX" And $err == 0 ) {
		mysql_query ( Biblio($SQL) )
			or printf ( "<br>$SQL<br> Probleme Execute <br>" .mysql_error() );
		}

	If ( $G_OS == "LINUX" And $err != 0 )
		mysql_query ( Biblio($SQL) );

	If ( $G_OS == "AS400" ) {
		odbc_exec($G_DBH, $SQL)
			or die ( "<pre><br>\n$SQL<br> Probleme Execute <br>\n" .odbc_errormsg() );
		}
}


/**
* Fetch
* Lit le record et place les champs dans $row
* A mettre dans une boucle while
* <pre>while( Fetch($RES , &$ROW )) {...}</pre>
* ROW accessible par $ROW[0]..[25] ou $ROW['ARARTI']
* @param RecordSet $res
* @param array Les champs [array]
* @return boolean TRUE=Yaencore FALSE=EOF
 */

Function Fetch (  $res , &$row ) {
  GLOBAL $G_DBH, $G_OS, $SCRIPT_NAME;

		$rc = false;
		// unset ( $row);

		If ( $G_OS == "LINUX" ) {
			$row = mysql_fetch_array($res);
			If ( $row ) $rc = true;
			}
		If ( $G_OS == "AS400" ) {
			$j=0;
		 	if(odbc_fetch_into($res,  $rowx)) {
 				while (list($key, $value)=@each($rowx))  {
 						$arret[odbc_field_name($res, $key+1)] = rtrim($value); // Nom de zone
 						$arret[$j++] = rtrim($value); // Par index
 				}
 				$row = $arret;	$rc = true;
 			}
		}
		return  ( $rc);
}




Function Page_Erreur ( $title, $lib ) {
	Header("Location: erreur.php?PG=" . $_SERVER["SCRIPT_NAME"]. "&T=$title". "&E=$lib");
	exit;
}



/**
 * Verifie les droits sur page en-cours
 * @param string Nom de la page encours voir MyUrl.
 */

 Function MyDroits ( $lapage  ) {

 }




$G_MFROM = ARRAY ('dspffd', 'dico', 'olarti00' , 'oltari00' , 'olclie00' , 'olfour00', 'olemch00', 'olctar00' , 'cplivre',
'olsfou00', 'oleach00', 'oldach00' , 'olstok00' , 'olefac00', 'oldfac00' , 'olepor00', 'oldpor00' ,
'wbmenu00' , 'ollibr00' , 'olinte00' , 'oladre00' , 'olsctpf' , 'olprmpf' ,	'oltelv00', 'oldepo00',
'olagacti00', 'olagevnd00' , 'olagevnt00', 'olagrlin00', 'olagfdep00', 'olagrptv00',
'wbgrpmnu00' , 'olsail00' , 'olrepr00' , 'wbusrprf00',
'olcond00', 'oltransfer' , 'wbgrpscp00' , 'wbstat00', 'olhcom00', 'olemdv00' ,
'olcoord00' , 'olcorhe00', 'olcorde00' , 'olkits00' , 'olcmdtext' , 'olsuperdev', 'olsuperlot',
'oldmdv00' , 'olchgd00'

);

$G_MREPL = ARRAY ('OLYMP_PHPD.DSPFFD', 'OLYMP_PHPD.DICO', 'OLYMP_D.OLARTI00' , 'OLYMP_TARD.OLTARI00' , 'OLYMP_D.OLCLIE00' , 'OLYMP_D.OLFOUR00' , 'OLYMP_ACHD.OLEMCH00' , 'OLYMP_TARD.OLCTAR00' , 'OLYMP_D.CPLIVRE' ,
'OLYMP_ACHD.OLSFOU00', 'OLYMP_ACHD.OLEACH00', 'OLYMP_ACHD.OLDACH00', 'OLYMP_STOD.OLSTOK00', 'OLYMP_VEND.OLEFAC00', 'OLYMP_VEND.OLDFAC00' , 'OLYMP_VEND.OLEPOR00', 'OLYMP_VEND.OLDPOR00',
'OLYMP_PHPD.WBMENU00' , 'OLYMP_D.OLLIBR00', 'OLYMP_D.OLINTE00', 'OLYMP_D.OLADRE00', 'OLYMP_D.OLSCTPF', 'OLYMP_D.OLPRMPF',
'OLYMP_D.OLTELV00' , 'OLYMP_D.OLDEPO00',
'OLYMP_PHPD.OLAGACTI00', 'OLYMP_PHPD.OLAGEVND00', 'OLYMP_PHPD.OLAGEVNT00', 'OLYMP_PHPD.OLAGRLIN00', 'OLYMP_PHPD.OLAGFDEP00', 'OLYMP_PHPD.OLAGRPTV00',
'OLYMP_PHPD.WBGRPMNU00', 'OLYMP_D.OLSAIL00', 'OLYMP_D.OLREPR00', 'OLYMP_PHPD.WBUSRPRF00',
'OLYMP_TARD.OLCOND00', 'OLYMP_PHPD.OLTRANSFER', 'OLYMP_PHPD.WBGRPSCP00' , 'OLYMP_PHPD.WBSTAT00', 'OLYMP_VEND.OLHCOM00', 'OLYMP_VEND.OLEMDV00',
'OLYMP_PHPD.OLCOORD00', 'OLYMP_PHPD.OLCORHE00', 'OLYMP_PHPD.OLCORDE00', 'OLYMP_VEND.OLKITS00' , 'OLYMP_PHPD.OLCMDTEXT', 'OLYMP_PHPD.OLSUPERDEV', 'OLYMP_PHPD.OLSUPERLOT',
'OLYMP_VEND.OLDMDV00' , 'OLYMP_PRPD.OLCHGD00'

);


/**
 * Associe le nom de la bib à un fichier
 * @param string $SQL Ordre Sql comme select update delete
 * @return string modifié par l'ajout de la bib
 */


Function Biblio ( $SQL, $TRADUC=0 ) {
Global $G_DBH, $G_OS, $G_MREPL, $G_MFROM;

	$SQL2 = Str_iReplace( 'olymp.' , '' , $SQL);
	$SQL2 = Str_iReplace( 'olymp_d.' , '' , $SQL2);
	$SQL2 = Str_iReplace( 'olymp_phpd.' , '' , $SQL2);
	$SQL2 = Str_iReplace( 'olymp_stad.' , '' , $SQL2);
	$SQL2 = Str_iReplace( 'olymp_vend.' , '' , $SQL2);

	return $SQL2;

	If ( stripos ($SQL, 'olymp_') > 1 Or $TRADUC !=0  )
		return $SQL;  // doit avoir OLYMP_xxxD

	$SQL2 = str_ireplace ( $G_MFROM, $G_MREPL , $SQL);

	return $SQL2;
}



/**
* Traitemenet des caracteres speciaux slash, quote dans SQL dans les update ou insert
* @param string Le champ
* @return string Le champ modifie
*/


function Speciaux ( $astr ) {
		Global $G_OS;

		If ( $G_OS == "LINUX" )
			return (addslashes ( $astr ));
		If ( $G_OS == "AS400" ) {
			$bstr = str_replace("\'", "''", $astr );
			// echo "<br>$astr $bstr";
			return ( $bstr );
			}
}


/**
* Retourne le nb de champs du Query
* <pre>$i = Num_Fields($RES ); </pre>
* @param RecordSet Le recordset
* @return int Le nb de champs du Query
 */
	function Num_Fields  ($res ) {
		Global  $G_OS;

		If ( $G_OS == "LINUX" )
				return ( mysql_num_fields( $res));
		If ( $G_OS == "AS400" )
				return ( odbc_num_fields ( $res));
	}


/**
* Retourne le nom de la colonne
*  <pre>echo Field_Name($RES ,5 );</pre>
* @param RecordSet $res
* @param Integer $i	Indice du champ ( à partir de 0 )
* @return String Retourne le nom de la colonne
 */


	Function Field_Name ( $res , $i ) {
		Global  $G_OS;

		If ( $G_OS == "LINUX" )
				return ( mysql_field_name ( $res, $i));
		If ( $G_OS == "AS400" )
				return ( odbc_field_name  ( $res, $i+1));
	}



	Function Num_Rows ( $res ) {
		Global  $G_OS;

		If ( $G_OS == "LINUX" )
				return   mysql_num_rows ( $res );

	}

/**
* Retourne le type de la colonne
*  <pre>echo Field_Type($RES ,5 );</pre>
* @param RecordSet $res
* @param Integer $i	Indice du champ ( à partir de 0 )
* @return String Retourne un string comprenant les info de définition de la colonne séparé par un blanc.
 */

	Function Field_Type ( $res , $i ) {
		global  $G_OS;

		If ( $G_OS == "LINUX" )
				return ( 'A A ' . StrToUpper(mysql_field_type ( $res, $i)));
		If ( $G_OS == "AS400" )
				return (  odbc_field_len  ( $res, $i+1) .
				 ' ' . odbc_field_scale  ( $res, $i+1).
				 ' ' . odbc_field_type ( $res, $i+1).
				 ' ' . odbc_field_precision   ( $res, $i+1).
				 ' ' . odbc_field_type  ( $res, $i+1));
	}






/**
* Recherche sur les mots d'une valeur <br> pour les statements select
* <pre> $sql  = Mot( 'ARDES1', 'sel de guerande' ); </pre>
* @param String Le nom de la zones
* @param String La valeur à exploder
* @return String ARDES1 like '%sel%' And ARDES1 like '%de%' And ARDES1 like '%guerande%'
*/

Function Mot (  $NZ , $PH ) {

	$m = Explode ( " ", Strtoupper(Trim($PH)));
	$i=0;
	Foreach ( $m As $value)
		if ( strlen ( $value) >= 1 ) {
		if ( 1 == ++$i ) $t = '('; else $t .= '   AND   ' ;
		$tmp = sprintf ( "%s like '%%%s%%'", $NZ , $value );
		$t .= $tmp;
	}
	$t .= ')';
	return  ( $t );
}


/**
* Recherche google map
* clé pour http://128.1.1.10
* clé pour http://smtp.infitex.fr:5625
*/
Function Googlemap () {

	$ip = $_SERVER['SERVER_NAME'];

		if ($ip  != 'smtp.infitex.fr' ) {
			echo "<script src=\"http://maps.google.com/maps?file=api&amp;v=2.x&amp;key=ABQIAAAANgN7FS1IiKAO6LTmZLumNxTnmKNC29w1CyhO49gVa8ImzJ2qOBSk1qwK07omy3Qb61CtrCF3L4D0Pw\" type=\"text/javascript\"></script>";
		}
	else {
			echo "<script src=\"http://maps.google.com/maps?file=api&amp;v=2&amp;key=ABQIAAAANgN7FS1IiKAO6LTmZLumNxQ8HPsTIy_uO-lCl5gqG4HZKnb5WRQPEvWYj4sfVp6X2S0SKcLoPox57g\" type=\"text/javascript\"></script>";
	}

}


/**
* Ajout dans DB stats locales
* <pre> $sql  = Mot( 'ARDES1', 'sel de guerande' ); </pre>
* @param String Le nom de la zones
* @param String La valeur à exploder
* @return String ARDES1 like '%sel%' And ARDES1 like '%de%' And ARDES1 like '%guerande%'
*/


Function AStat ($STATUS, $PARAM ) {
Global $G_SOCI , $G_USERSES ;


	$LISESSION = substr (Session_Id() , -16, 16);

	$SQL = sprintf("INSERT INTO wbstat00 (STSOCI, STCLIENTIP, STUSER, STDATE, STTIME, STSTATUS,  STPARAM, STSESSIONID) VALUES ".
		"( '$G_SOCI','%s', '$G_USERSES' ,%d, %d, '%s', '%s', '%s')",
		$_SERVER["REMOTE_ADDR"],  Date('Ymd'), Date('His'), Substr($STATUS, 0, 8), Substr($PARAM, 0, 20), Substr($LISESSION, 0, 16) );
	Execute ( $SQL );

}




Class MetM {


public  $Name_Afile = '';
public  $Contents = '';


Function __construct($Afile) {
Global $G_DIR_WWW;

	$Name_Afile = "$G_DIR_WWW/$Afile";

	$handle = @fopen ($Name_Afile, "r");
	if ( ! $handle ) {
		Echo "<br>MetM __construct $Name_Afile n'existe pas";
		return;
	}
	$this->Contents = fread ($handle, filesize ($Name_Afile));
	fclose ($handle);

	}

public function __toString() {
        return  $this->Name_Afile . '->'. $this->Contents;
    }


public Function Display ( $Section) {
Global $coul, $row, $ROW, $ROW_A, $row2, $ROW2, $TA, $COULEUR_BGCOLOR, $Nom_Page_Modif, $ERR, $G_GROUPE_COURT ;

	$i1 = strpos ( $this->Contents ,"\n[$Section]" );
	If ( $i1 > 0) {
		$i2 = strpos ( $this->Contents ,"\n[", $i1+2 );
		if ( $i2 == false ) $i2=999999;
		$i = $i1 + 3 + Strlen( $Section );
		$chaine = "?>" . Substr( $this->Contents , $i , $i2-$i);
		$chaine = Str_Replace ('{{',  chr(1) , $chaine);
		$chaine = Str_Replace ('}}',  chr(2) , $chaine);
		$chaine = Str_Replace ('{', '<?= ', $chaine);
		$chaine = Str_Replace ('}', '?>', $chaine);
		$chaine = Str_Replace ( chr(1) , '{', $chaine);
		$chaine = Str_Replace ( chr(2) , '}', $chaine);

		$chaine = Str_Replace ('</IF>', ' <? } ?>', $chaine);
		$chaine = Str_Replace ('<IF', ' <? If ', $chaine);
		$chaine = Str_Replace ('FI>', ' { ?>', $chaine);
	}
	// var_dump ( $chaine );
	// @eval ( $chaine  ) Or Printf("<br>Erreur EVAL sur <br><pre>------\n%s\n------</pre>", $chaine );
	eval ( $chaine  );
	}
}






Function  Limit_SQL( $NB ) {
	Global $G_OS;

	If ( $NB == '' ) $NB = 100;
	If ( $G_OS == 'AS400') return "  FETCH FIRST $NB ROWS ONLY  ";
	return " LIMIT $NB  ";
}





/////////////////////////////////////////////////////////////////////////////////////////
Function Fonc_Redim2 ($img, $taille)
{


    $image_dim = getimagesize($img);

	$width= $image_dim[0]; $height =  $image_dim[1]; $type =  $image_dim[2];
	If ( $width <= $taille and $height <= $taille ) {
	    // trop petit
		return (" height=$height width=$width " );
	}

    //respect du ratio hauteur/largeur pour le calcul des nouvelles dimensions
    if($image_dim[0] > $image_dim[1]) // x est plus grand que y
    {
       $new_x = $taille;
       $new_y = $image_dim[1]/($image_dim[0]/$taille);
    }
    else
    {
       if($image_dim[0] < $image_dim[1]) // y est plus grand que x
       {
          $new_y = $taille;
          $new_x = $image_dim[0]/($image_dim[1]/$taille);
       }
       else // x == y
       {
          $new_x = $taille;
          $new_y = $taille;
       }
    }

	return (" height=$new_y width=$new_x " );

}




Function Code_Code ( $thestr ) {


$MM = array( "à"=>"&#224;", "â"=>"&#226;",
	"ç"=>"&#231;", 	"è"=>"&#232;",
	"é"=>"&#233;", 	"ê"=>"&#234;",
	"î"=>"&#235;", 	"ï"=>"&#238;",
 	"ô"=>"&#239;", 	"ù"=>"&#244;",
 	"û"=>"&#249;", 	"û"=>"&#251;",
 	"ü"=>"&#252;", 	"€"=>"&#8364;",
 	"&"=>"&#38;" , 	"@"=>"&#64;",
 	"["=>"&#91;" , 	"]"=>"&#93;" ,
 	"^"=>"&#94;" , 	"{"=>"&#123;",
 	"|"=>"&#124;",	"}"=>"&#125;",
 	"£"=>"&#163;",	"²"=>"&#178;",
 	"³"=>"&#179;",	"¼"=>"&#188;",
 	"½"=>"&#189;",	"¾"=>"&#190;",
 	"°"=>"&#176;", 	"ø"=>"&#248;",
 	"Ø"=>"&#216;", 	"µ"=>"&#181;",
 	"À"=>"&#192;", 	"Á"=>"&#193;",
 	"Â"=>"&#194;", 	"Ã"=>"&#195;",
 	"Ä"=>"&#196;", 	"Å"=>"&#197;",
	"'"=>"''" , '"' => "''",
	"€"=>"&euro;"
 	);

	$y = strtr (   $thestr , $MM);
 	return  $y;
 }



Function Code_Code2 ( $theStr ) {

	$y = utf8_decode ( $theStr ) ;
 	return  $y;

}


Function Dbg_Dbg ( $tmp ) {
Global $G_DEBUG;
	If ( ! $G_DEBUG ) return;

	$handle = fopen("/www/antoine/logxml.log", "a");
	fprintf ( $handle , "\n%s\n%s", date(DATE_RFC822), $tmp );
	fclose ($handle  );
}



Function Nf2 ( $val ) {
	$val = (double) $val;

	If ( $val == 0 ) {
		$tmp = '&nbsp;' ;
		return ($tmp);
	}
	else {
		$tmp = number_format($val, 2, ',', ' ');
		return ($tmp);
	}
}


Function Colonne_Tri (  $title , $nos=0) {
Global $TRI;

	If ( $nos == 0 )
		 Printf("\n\t<TH>%s</TH>" , $title );
	Else
		Printf("\n\t<TH>" .
	"<IMG Alt=\"Tri croissant \" onClick=\"tri(%d);\" BORDER=0 SRC=/style/%s.gif>" .
	"<IMG Alt=\"Tri Décroissant \" onClick=\"tri(%d);\" BORDER=0 SRC=/style/%s.gif>%s</TH>",
			$nos , $TRI == $nos ? 'hr' : 'hb' ,  -$nos ,
		    $TRI ==-$nos ? 'br' : 'bb' , $title ) ;

}


Function  Colisage ( $ARTI , $OPTION='1' ) {
	Global $G_SOCI;


	$SQL = "SELECT * FROM olarti00 where ARSOCI='$G_SOCI' And ARARTI='$ARTI'";

	Query ( $SQL, $RES);
	If ( Fetch($RES, $ROWD )) {
		If ( $OPTION == 1 )
			Return $ROWD['ARCOLNB1'];
		If ( $OPTION == 2 )
			Return $ROWD['ARCOLNB2'];
		If ( $OPTION == 0 Or $OPTION == 10  Or $OPTION == 20 )
			Return $ROWD['ARCOLUNI2'] . '  de ' . $ROWD['ARCOLNB2'] . ', ' .$ROWD['ARCOLUNI1']  . ' de '.  $ROWD['ARCOLNB1'];
		If ( $OPTION == 11 )
			Return $ROWD['ARCOLUNI1']  . ' de '.  $ROWD['ARCOLNB1'];
		If ( $OPTION == 12 )
			Return $ROWD['ARCOLUNI2']  . ' de '.  $ROWD['ARCOLNB2'];
	}


	Return '???';
}

?>