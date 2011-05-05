<?
	Include ("commun/commun.php");

	If (File_Exists( "tmp/rech_$G_IP.xml" ))
	    $XML = Simplexml_Load_File( "tmp/rech_$G_IP.xml" );
	Else
	    Exit('Echec lors de l ouverture du fichier test.xml.');

 ////// VAR_DUMP ( $XML -> SQL_DESI  , $XML->NB   );
 ////// PRINT_R($XML);
 //////	V ( $_GET );

	Que_Choisir ( $P );

	Que_Choisir_Secteur  ( $G_SECTEURN );




Function Que_Choisir ( $param) {
Global $XML, $LS, $G_SECTEURN, $G_SECTEURA, $G_TITRE, $G_SUPER, $G_LSUPER, $LIBSECT, $FRS;


 /// Le fournisseur est t il en conflit avec une autre recherche
   $rmp == 0 ;

   If ( $FRS != '' )
     For (  $i = 0 ; $i < $XML->NB_FOURS ; ++$i  )
   		If ( $FRS == $XML->FOURS[$i]-> FOUR )
   			$FRS2 = $FRS;


	For ( $i = 0 ; $i < $XML->NB ; ++$i  ) {

		$ARTI 		= $XML->ITEMS[$i]->ARTI ;
		$SECTEUR	= (int)$XML->ITEMS[$i]->SECTEUR  ;

		$FOUR		= (int)$XML->ITEMS[$i]->FOUR  ;

		If ( $FRS2 <> '' And $FOUR <> $FRS2 ) Continue;
		$CLASS		= $XML->ITEMS[$i]->TITRE . $XML->ITEMS[$i]->STITRE;
		$CLASS		= SubStr($XML->ITEMS[$i]->TITRE, 0 , 1 ) . (int)$XML->ITEMS[$i]->SUPER;

		/// Par Nombre
		$Q   [ $CLASS ] ++;

		// Par Ponderation de classement
		If ( $XML->ITEMS[$i]-> AFF_POIDS > 0 )
			$Q  [ $CLASS ] +=  ($XML->ITEMS[$i]-> AFF_POIDS * 20);


	     //// Recherche des items par secteur ////
		If ( $SECTEUR > 0 )
			$NB[ $SECTEUR ] ++ ;
	}
	arsort ( $Q );

	/// So What to do
	$G_SECTEURN = 0; $G_SECTEURA = $G_TITRE  ='';
	ForEach ( $Q  as $K => $V ) {
		If ( SubStr( $K, 0, 1 ) >= 'A' ) {
			$G_SECTEURN = (integer) ( Ord(SubStr( $K, 0, 1 )) - Ord('A') +1 ) ;   /// Prem Secteur
			$G_SECTEURA = SubStr( $K, 0, 1 ) ;
			$G_TITRE  = $K ;					/// Prem TITRE/STITRE
		}
		Break;
	}

    If ( Trim($param) != '' )  $G_SECTEURN = $param;
	//  Les autres SECTEURS
	ForEach ( $Q  as $K => $V ) {
		If ( SubStr( $K, 0, 1 ) >= 'A' )
			$G_SECTEURS [ (integer) ( Ord(SubStr( $K, 0, 1 )) - Ord('A') +1 ) ] = 1;
		Else
			$G_SECTEURS [ 0 ] = 1;
	}
	ksort ( $G_SECTEURS, SORT_NUMERIC );

	For ( $i = 0 ; $i < $XML->NB ; ++$i  )
		If ( $XML->ITEMS[$i]-> TITRE . $XML->ITEMS[$i]-> STITRE  == $G_TITRE )
			$G_SUPER = (integer) $XML->ITEMS[$i]->SUPER ;
  
	 If ( $G_SUPER >  0 ) {
		Query ("select LIB from super_secteur_v2 where ID_super_secteur_v2 = $G_SUPER", $RES );
		If ( Fetch ( $RES, $R ))  $G_LSUPER  = $R[0];   
	 }
 //// var_dump ($G_SECTEURN, $G_SECTEURA, $G_TITRE, $G_SUPER, $G_LSUPER 	); 	print_r ( $G_SECTEURS );


	// Printf ("\n<div class=g_s>");

	ForEach ( $G_SECTEURS as $k => $v)
		If ( $k  != $G_SECTEURN )
			$LIBSECT[$k] = sPrintf ("\n<a onclick=\"sidebar('$k');return false;\" class=\"bouton petit bleu\" href=#>%s (%s)</a>",  $LS[$k], $NB[$k] );
		else
			$LIBSECT[$k] = sPrintf ("\n<a onclick=\"sidebar('$k');return false;\"  class=\"bouton petit orange\" href=#>%s (%s)</a>",  $LS[$k], $NB[$k] );

	/// Printf ("\n</div>\n");

}



Function Que_Choisir_Secteur ( $S ) {

Global $XML, $LS, $G_SECTEURN, $G_SECTEURA, $G_TITRE, $G_SUPER, $G_LSUPER, $LIBSECT, $FRS ;


   /// Le fournisseur est t il en conflit avec une autre recherche
   $rmp = 0; $prem = $prem2 = '';

   If ( $FRS != '' )
     For (  $i = 0 ; $i < $XML->NB_FOURS ; ++$i  )
   		If ( $FRS == $XML->FOURS[$i]-> FOUR )
   			$rmp = 1;

   If  ( $rmp == 0 ) {
   		$FRS  = '';
   		$prem2 = "\ndocument.getElementById('FRS').value='';\n" ;

   }

	Print '<div class="spacer">';
	Foreach ( $LIBSECT as $k1 => $v1 )
		If ( $k1 <= $S )
			Print $v1;
	Print '</div>';

	For ( $i = 0 ; $i < $XML->NB ; ++$i  )
		If ( $S == $XML->ITEMS[$i]-> SECTEUR ) {

			If ( $FRS <> '' And $XML->ITEMS[$i]-> FOUR  <> $FRS )   Continue;

			$SUPER = (integer) $XML->ITEMS[$i]-> SUPER ;
			$Q[ $SUPER ] ++;
			$QQ[ $SUPER ] ++;

 		// Par Ponderation de classement
		If ( $XML->ITEMS[$i]-> AFF_POIDS > 0 )
			$Q  [ $SUPER] +=  ($XML->ITEMS[$i]-> AFF_POIDS * 20);

		// Par nom du titre
 	}

 	arsort ( $Q, SORT_NUMERIC );

//// var_dump ( $Q);
////// AFFICHAGE SUPER SECTEUR
    Printf ("\n<div class=recherche2>\n\n<ul>\n\n");

    //// ALLLL  //////
    $cpt = 0;
    ForEach ( $Q As $k => $v ) {
    		$tmpall .= "$k|";
    		$cpt++;
    }

    If ( $cpt > 1 )
    	Printf( "\n\t<li><a href=# id=\"ss_all\" onclick=\"liste_produits('%s', 1);return false;\">%s</a></li>" ,
	    	    	$tmpall ,'&gt; Tout voir'   ) ;

 	ForEach ( $Q As $k => $v ) {

		Query ("select LIB, SECTEUR, DE, A, ID_super_secteur_v2 From super_secteur_v2 WHERE ID_SUPER_SECTEUR_V2 = $k", $RES );
		
		If ( Fetch ( $RES, $R )) {
		     If ( $prem == '' )
				$prem = sprintf ("liste_produits('%s', 1);" , $R[4]);	
			
			Printf( "\n\t<li><a href=# id=\"ss_%s\" onclick=\"liste_produits('%s', 1);return false;\">%s (%s)</a></li>" ,
    	    	$R[4],
    	    	$R[4],
        		$R[0 ] , $QQ [ $k ] ) ;
        } Else
        	Printf( "\n\t<li><a href=# id=\"ss_%s\" onclick=\"liste_produits('%s', 1);return false;\">%s (%s)</a></li>" , 0 , 0 , "Inconnus …", $QQ [ $k ] ) ;
        
 	}
   Printf ("\n</ul>\n</div>");

   print '<div class="spacer">';

    ForEach ( $LIBSECT as $k1 => $v1 )
		If ( $k1 >$S )
			Print $v1;

	Print '</div><br>';



   Printf ("\n<fieldset>");
   Printf ("\n<legend> Filtre marque </legend>");
   Printf ("\n		<select name=R_MARQ onchange=\"filtre_frs(this.value)\">
      		\n<option value=''>Tous&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</option> ");
      	//	\n<option value='*'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</option>");




   For ( $i = 0 ; $i < $XML->NB_FOURS ; ++$i  ) {
   			If ( $FRS == $XML->FOURS[$i]-> FOUR ) $rmp = 'selected'; else $rmp='';
   			Printf ("\n<Option value=\"%s\" $rmp >%s</Option>", $XML->FOURS[$i]-> FOUR , ucfirst(strtolower($XML->FOURS[$i]-> RAIS)));
   }

   Printf ("\n			 </select>");
   Printf ("\n</fieldset>");




   Printf ("\n<lance>\n%s" ,  $prem2 . $prem );


}
?>