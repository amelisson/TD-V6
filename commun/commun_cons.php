<?


	$MAX_IMAGES_PAR_TABLEAU = 8;   // Nb d'images dans l 'affichage des articles dans les tableaux

	// $KEYMAP = 'ABQIAAAA_Ur0U4OJgrBF03Kck9cikhSmrQJPHxaY3sRRSTdu2wLuM6rPwRS8kosMbUlEyEYotTqKt8y3QCJy3A';

	$G_DIR_1 = "";
	$G_DIR_2 = "";
    $G_CLIE	='FORNORD';   // IFX, BAYART   Nom du client
 	$G_DB 	= "trenois";
 	$G_USER	= "root";
 	$G_PWD	= "";
 	$G_TRANSFERT			= false ;    // Menu Transfert
 	$G_SERVER				="localhost";
 	$G_SERVER_IP			="128.1.1.9";
 	$G_SERVER_USER			="TRANSFERT";
 	$COULEUR_BGCOLOR 		='F5F7F8';
 	$G_EMAIL_MANAGER 		='amelisson@infitex.fr';
 	$G_DUREE_VISITE 		= 100;
 	$G_DIR_WWW 				= "D:\\fornord\\olymp";

 	$G_DIR_IMG 	= '/var/td_v6';
 	$G_DIR_IMG	= '/volume1/web/tdv6/';

 	$G_DIR_PHOTOS 			= "/var/cube/photos";
	$G_IP = $_SERVER["REMOTE_ADDR"];

 	$G_DIR_TEMP 			= "/var/cube/olymp/tmp";

  	$G_SOCI  = '01';

	$G_USER	= "root";
	$G_PWD	= "";
 	$G_SERVER="S6507CFA";
 	$G_CUBE	= "http://128.1.1.14";
 	$G_SQLSERVER = "localhost";

 	$G_OS = "LINUX";

 	unset ($G_DBH );

	$Nom_Page_EnCours = Trim( $_SERVER["SCRIPT_NAME"] ) ;
	$NOM_PAGE_ENCOURS = $G_NOM_PAGE_ENCOURS = $nom_page_encours = $Nom_Page_EnCours  ;

	// echo ":$Nom_Page_EnCours:"; exit;


	$G_DBH = mysql_connect($G_SQLSERVER, $G_USER, $G_PWD )
 		or die ( "<br><pre>Probleme de connexion sur mysql_connect mysql_connect($G_SERVER, $G_USER, $G_PWD ) <br>" . mysql_error() );
	mysql_select_db ( $G_DB  )
		or die ( "<br><pre>Probleme de connexion sur mysql_select_db mysql_connect($G_SERVER, $G_USER, $G_PWD )<br>". mysql_error() );


  	$G_LS[0] = "Nouvelles références";
  	$G_LS[] = "Serrurerie";
  	$G_LS[] = "Contrôle d'accès";
  	$G_LS[] = "Béquillage";
  	$G_LS[] = "Ferme-portes";
  	$G_LS[] = "Charnières";
  	$G_LS[] = "Quincaillerie";
  	$G_LS[] = "Ferrures";
  	$G_LS[] = "Agencement";
  	$G_LS[] = "Outillage";
  	$G_LS[] = "Consommable";
  	$G_LS[] = "EPI";
  	$G_LS[] = "Nouvelles références";


  	$G_DEBUG = true;

  	function v  ( $value, $title='' ) {

  		if ( ! $GLOBALS['G_DEBUG'] ) return;

  		Echo "<br>\n<pre>" ;
  		var_dump ( $value);
  		Echo "\n</pre>" ;

  	}


   
?>