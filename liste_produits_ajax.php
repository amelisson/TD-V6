<?

    Include ("commun/commun.php");

    $PREF = Simplexml_Load_File("tmp/pref_$G_IP.xml");

    If (File_Exists("tmp/rech_$G_IP.xml"))
        $XML = Simplexml_Load_File("tmp/rech_$G_IP.xml");
    Else
        Exit('Echec lors de l ouverture du fichier test.xml.');

/////// Echo " liste_produits_ajax.php?SS=$SS&PAGE=$PAGE&VIG=$VIG&FRS=$FRS <br>";  V ( $_REQUEST);

/// Supression des FOURNISSEURS
	If ( $FRS <> '' )
	     For ($i = 0; $i < $XML->NB; ++$i)
	         If ($FRS != $XML->ITEMS[$i]->FOUR  ) {
	         	   $XML->ITEMS[$i] ->SECTEUR = 99;
              	   $XML->ITEMS[$i] ->SUPER = 9999;
             }

    If ($VIG == '')
        $AFF = 'VIG';
    Else
        $AFF = $VIG;

    Unset($MEMO_IMG);

    ForEach (explode('|', $SS) as $ss1) {
        If ($ss1 != '') {
            If ($AFF == 'TAB')
                Super_Secteur_Tablo($ss1, $PAGE);
            Else
                Super_Secteur_Vignette($ss1, $PAGE);
        }
    }


    Function Super_Secteur_Tablo($SS, $PAGE)
    {
        Global $XML, $PREF, $AFF, $MEMO_IMG, $FRS;

        $MAX12 = $PREF->MAX_LISTE;

        ///////// Combien d items
       	 For ($i = 0; $i < $XML->NB; ++$i)
          	If ($SS == $XML->ITEMS[$i]->SUPER  )
              	$CPT++;


        // Pagination

        If ($PAGE == '')
            $PAGE = 1;
        If ($CPT > $MAX12) {

            $nbpage = Ceil($CPT / $MAX12);
            $p1 = $PAGE <= 1 ? 1 : $PAGE - 1;
            $p2 = $PAGE >= $nbpage ? $nbpage : $PAGE + 1;

            Printf("\n<span  class=%s onclick=\"liste_produits('$SS',$p1);return false;\">&lt;</span>",
                'pagination');
            Printf("\n<span  class=%s onclick=\"liste_produits('$SS',$p2);return false;\">&gt;</span>",
                'pagination');
            Printf("\n<span  class=%s onclick=\"liste_produits('$SS', 0);return false;\">Tout voir</span>",
                $PAGE == 0 ? 'pagination_actuel' : 'pagination');
            For ($j = $i = 1; $i <= $CPT; $i += $MAX12, ++$j)
                Printf("\n<span  class=%s onclick=\"liste_produits('$SS',$j);return false;\">$j</span>",
                    $PAGE == $j ? 'pagination_actuel' : 'pagination');
        }
        Printf("\nTrouvé %s articles\n<table cellpadding=5 cellspacing=5 class=aff_prod_table>\n",
            $CPT);


        //  Affichage

        // Calcul de a
        $depart = ((integer)($PAGE) - 1) * $MAX12 + 1;
        $fin = $depart + $MAX12 - 1;
        If ($fin > $XML->NB)
            $fin = $XML->NB;


        // Calcul des images
        //
        For ($i = 0; $i < $XML->NB; ++$i)
            If ($SS == $XML->ITEMS[$i]->SUPER) {
                $indice = $XML->ITEMS[$i]->TITRE . $XML->ITEMS[$i]->STITRE . $XML->
                    ITEMS[$i]->MODELE;

                $pos = strpos($MEMO_IMG[$indice], (string )$XML->ITEMS[$i]->
                    PERE);
                If ($pos === false And substr_count($MEMO_IMG[$indice], '|') < $GLOBALS['MAX_IMAGES_PAR_TABLEAU'])
                    $MEMO_IMG[$indice] .= (string )$XML->ITEMS[$i]->PERE . '|';
            }


        // Go vignette
        For ($j = $i = 0; $i < $XML->NB; ++$i)
            If ($SS == $XML->ITEMS[$i]->SUPER) {
                $j++;
                If ($PAGE == 0)
                    Affiche_Produit_Liste((string )$XML->ITEMS[$i]->ARTI, (string )
                        $XML->ITEMS[$i]->PERE, $XML->ITEMS[$i]);
                Elseif ($depart <= $j And $j <= $fin)
                    Affiche_Produit_Liste((string )$XML->ITEMS[$i]->ARTI, (string )
                        $XML->ITEMS[$i]->PERE, $XML->ITEMS[$i]);
            }


        Echo "\n</table>";

    }


    Function Super_Secteur_Vignette($SS, $PAGE)
    {
        Global $XML, $PREF, $AFF, $TRI;

        $MAX12 = $PREF->MAX_VIGNETTE;
        ///////// Combien d item  en tout
        For ($i = 0; $i < $XML->NB; ++$i)
            If ($SS == $XML->ITEMS[$i]->SUPER)
                $CPTGLO++;

        ///////// Combien d item en pere
        For ($i = $CPT = 0; $i < $XML->NB_PERES; ++$i)
            If ($SS == $XML->PERES[$i]->SUPER)
                $CPT++;

        // Pagination

        If ($PAGE == '')
            $PAGE = 1;
        If ($CPT > $MAX12) {

            $nbpage = Ceil($CPT / $MAX12);
            $p1 = $PAGE <= 1 ? 1 : $PAGE - 1;
            $p2 = $PAGE >= $nbpage ? $nbpage : $PAGE + 1;

            Printf("\n<span  class=%s onclick=\"liste_produits('$SS',$p1);return false;\">&lt;</span>",
                'pagination');
            Printf("\n<span  class=%s onclick=\"liste_produits('$SS',$p2);return false;\">&gt;</span>",
                'pagination');
            ;
            Printf("\n<span  class=%s onclick=\"liste_produits('$SS', 0);return false;\">Tout voir</span>",
                $PAGE == 0 ? 'pagination_actuel' : 'pagination');
            For ($j = $i = 1; $i <= $CPT; $i += $MAX12, ++$j)
                Printf("\n<span  class=%s onclick=\"liste_produits('$SS',$j);return false;\">$j</span>",
                    $PAGE == $j ? 'pagination_actuel' : 'pagination');
        }

		$p1 = $p2 = $p3 = '';
		Switch ( $TRI ) {
			case 'PERTINENCE_DESCENDING' :
				 $p1 = 'selected="selected"';
				break;
			case 'PRICE_ASCENDING' :
				$p2 = 'selected="selected"';
				break;
			case 'PRICE_DESCENDING' :
				$p3 = 'selected="selected"';
				break;
			default :
				$p1 = 'selected';

		}

        Printf ("Trié par \n<select id=\"SELECTTRIERPRODUITS\" name=\"ORDEREDBY\" onchange=\"triChange(this.value);return false;\">
					            \n\t<option $p1 value=\"PERTINENCE_DESCENDING\">Pertinence</option>
					            \n\t<option $p2 value=\"PRICE_ASCENDING\">Prix croissant</option>
					            \n\t<option $p3 value=\"PRICE_DESCENDING\">Prix décroissant&nbsp;&nbsp;&nbsp;&nbsp;</option>
			        \n</select>");


        Printf("\nTrouvé <b>%s</b> articles dans <b>%s</b>\n<table cellpadding=10 cellspacing=10 class=aff_prod_table>\n",
            $CPTGLO, Fichier_super_secteur($SS));


        //  Affichage

        // Calcul de a
        $depart = ((integer)($PAGE) - 1) * $MAX12 + 1;
        $fin = $depart + $MAX12 - 1;
        If ($fin > $XML->NB)
            $fin = $XML->NB;



		//// Tri par prix
		If (  $TRI == 'PRICE_ASCENDING' Or $TRI == 'PRICE_DESCENDING' ) {
				 For ( $i = 0; $i < $XML->NB; ++$i)
				 	If ($SS == $XML->ITEMS[$i]->SUPER) {
						$MPRIX[ (string )$XML->ITEMS[$i]->ARTI ]  = (double) $XML->ITEMS[$i]->PV;
						$MPEREP[ (string )$XML->ITEMS[$i]->ARTI ] = (string) $XML->ITEMS[$i]->PERE;
						$MINDEX[ (string )$XML->ITEMS[$i]->ARTI ] = $i;
						}

				 If (  $TRI == 'PRICE_ASCENDING' )   asort ( $MPRIX );
				 If (  $TRI == 'PRICE_DESCENDING' ) arsort ( $MPRIX );

				///////////  Print_R ( $MPRIX );   ////////////////
				$j = 0;
				ForEach ( $MPRIX as $k => $v )  {
        	        $j++;

        	        If ($PAGE == 0)
        	            Affiche_Produit_Vignette((string )$k, $MPEREP[$k], $MINDEX[$k] );
                	elseif ($depart <= $j And $j <= $fin) {

                	    $rc = Affiche_Produit_Vignette( $k , $MPEREP[$k], $MINDEX[$k] );
                	    If ($rc == 0)
                	        $j--;

                }
            }

		}
        ////// GO VIGNETTE ///// TRI PAR PERTINENCE ////////////
        Else {
        	For ($j = $i = 0; $i < $XML->NB; ++$i)
        	    If ($SS == $XML->ITEMS[$i]->SUPER) {
        	        $j++;

        	        If ($PAGE == 0)
        	            Affiche_Produit_Vignette((string )$XML->ITEMS[$i]->ARTI, (string )
        	                $XML->ITEMS[$i]->PERE , $i );
                	elseif ($depart <= $j And $j <= $fin) {

                	    $rc = Affiche_Produit_Vignette((string )$XML->ITEMS[$i]->ARTI ,
                	        (string )$XML->ITEMS[$i]->PERE, $i );
                	    If ($rc == 0)
                	        $j--;

                }
            }
        }

        Echo "\n</table>";
    }


    // Vignette
    Function Affiche_Produit_Vignette($ARTI, $PERE, $I)
    {

     //////    Echo "<br>Affiche_Produit_V ( $ARTI, $PERE ) ";

        GLOBAL $XML;
        STATIC $MEMO_PERE, $J = 0;

        If ($MEMO_PERE["$PERE"] == 1)
            return 0;
        $MEMO_PERE["$PERE"] = 1;

        If (((++$J) % 3) == 1)
            Echo "</TR>\n\n<TR>";

        Query("SELECT * FROM olarti99 WHERE 99ARTI='$ARTI'", $RES);
        If (!Fetch($RES, $RA))
            return;

        $sql = sPrintf("select * from arbo where TITRE='%s'", Substr($RA['99NOMENC'],
            0, 3));
        $sql .= sPrintf(" And STITRE='%s'", Substr($RA['99NOMENC'], 3, 3));
        $sql .= sPrintf(" And MODELE='%s'", Substr($RA['99NOMENC'], 6, 3));

        Query($sql, $RES);
        Fetch($RES, $RR);

        Printf("\n<TD bgcolor=white valign=top width=33%%>");
        Printf("\n<span class=aff_prod_table_a>%s, %s %s</span><br><br>", $RR['LIB_TITRE'],
            $RR['LIB_STITRE'], $RR['LIB_MODELE']);

		$tmp = Trouve_Images_160($PERE);
        If ( $tmp != '')
           Printf("\n<center><img border=0 alt=\"%s\" title=\"%s\" src=\"%s\"></center>",
            $PERE, "$PERE | ${RA['99DESI']}", $tmp );

        Printf("\n<br><a href=\"http://www.trenois.com/fiche_produit.php?ARTI=%s\"><b>%s</b></a> %s",
            $ARTI, $ARTI, $RA['99DESI']);

        Printf("\n<span class=prixpv>%s&nbsp;&euro;</span>", $XML->ITEMS[$I]->PV );


        For ($j = 0; $j < $XML->NB_PERES; ++$j) {
            If ($XML->PERES[$j]->ARTI == $PERE)
                If ($XML->PERES[$j]->NB > 1) {
                    Printf("<br><br><span class=a_suivre> A suivre (<b>%s</b>) ...<span> ",
                        $XML->PERES[$j]->NB - 1);
                    Break;
                }
        }

        Printf("\n</TD>");

        return 1;
    }


    /// Liste
    Function Affiche_Produit_Liste_Lettrine ($ARTI, $PERE, $XMLR)
    {
        STATIC $NOMENC99, $M_L, $MEMO_PERE;
        GLOBAL $MEMO_IMG, $PREF;

        //// Echo " Affiche_Produit_Liste ( $ARTI, $PERE ";
        //// var_dump  (  (string) $PREF->MAX_PERE , $PERE, $MEMO_PERE );

        If ((string )$PREF->MAX_PERE == 'O') {
            If ($MEMO_PERE["$PERE"] == 1)
                return 0;
            $MEMO_PERE["$PERE"] = 1;
        }

        Query("select * from olarti99 where 99arti='$ARTI'", $RES);
        If (!fetch($RES, $RA))
            return;


        If (Substr($NOMENC99, 0, 9) != Substr($RA['99NOMENC'], 0, 9)) {
            $sql = sprintf("select * from arbo where TITRE='%s'", Substr($RA['99NOMENC'],
                0, 3));
            $sql .= sprintf(" And STITRE='%s'", Substr($RA['99NOMENC'], 3, 3));
            $sql .= sprintf(" And MODELE='%s'", Substr($RA['99NOMENC'], 6, 3));

            Query($sql, $RES);
            Fetch($RES, $RR);
            $NOMENC99 = $RA['99NOMENC'];
            $prem = true;
            Printf("\n</TD></TR>");

            Printf("\n<TR><TD bgcolor=white valign=top align=right width=170>");

            $L = 64;
            $M_L = Explode('|', $MEMO_IMG[SubStr($NOMENC99, 0, 9)]);
            //	print_r ( $M_L );
            ForEach ($M_L As $val)
                If (Trim($val) != '') {

                    $L++;
                    // Printf ( "\n<a href=\"http://www.trenois.com/admin/modif_article_detail_400.php?ARTI=$val\">[M]</a>");
                    Printf("\n<span class=lettrine>%s</span><a href=\"http://www.trenois.com/fiche_produit.php?ARTI=%s\"> " .
                        "<img border=0 alt=\"%s\" title=\"%s\" src=\"%s\"></a>",
                        Chr($L), $val, $val, $val . ' | ' . htmlspecialchars($RA['99DESI']),
                        Trouve_Images_60($val));
                }

            Printf("\n</TD><TD bgcolor=white valign=top>");
            Printf("\n<span class=aff_prod_table_b>%s, %s %s</span><br>",
                htmlspecialchars($RR['LIB_TITRE']), htmlspecialchars($RR['LIB_STITRE']),
                htmlspecialchars($RR['LIB_MODELE']));
        }

        Printf("\n\n<span onmouseover=\"affichePhoto('<b>%s</b> %s<br><br><center><img src=%s>');\" onmouseout=\"effacePhoto();return false;\">\n",
            $ARTI, htmlspecialchars($RA['99DESI']), Trouve_Images_160($PERE));
        $L = Array_Search("$PERE", $M_L);
        If ($L >= 0)
            ;
        Printf("<span class=lettrine>%s</span>", Chr(65 + $L));
        Printf("\n<b><a href=maj_article_c.php?ARTI=$ARTI>[M]</a> <a href=\"http://www.trenois.com/fiche_produit.php?ARTI=%s\">%s</a></b> %s %s<br></span>",
            $ARTI, $ARTI, '' /* $XMLR->SUPER */, htmlspecialchars($RA['99DESI']));

    }




 /// Liste
    Function Affiche_Produit_Liste ($ARTI, $PERE, $XMLR)
    {
        STATIC $NOMENC99, $MEMO_PERE, $CPT5, $MEMO_PERE2 ;
        GLOBAL $MEMO_IMG, $PREF;

        //// Echo " Affiche_Produit_Liste ( $ARTI, $PERE ";
        //// var_dump  (  (string) $PREF->MAX_PERE , $PERE, $MEMO_PERE );

        If ((string )$PREF->MAX_PERE == 'O') {
            If ($MEMO_PERE["$PERE"] == 1)
                return 0;
            $MEMO_PERE["$PERE"] = 1;
        }

        Query("Select * from olarti99 where 99arti='$ARTI'", $RES);
        If (!fetch($RES, $RA))
            return;


        If (Substr($NOMENC99, 0, 9) != Substr($RA['99NOMENC'], 0, 9)) {
            $sql = sprintf("select * from arbo where TITRE='%s'", Substr($RA['99NOMENC'],
                0, 3));
            $sql .= sprintf(" And STITRE='%s'", Substr($RA['99NOMENC'], 3, 3));
            $sql .= sprintf(" And MODELE='%s'", Substr($RA['99NOMENC'], 6, 3));

            Query($sql, $RES);
            Fetch($RES, $RR);
            $NOMENC99 = $RA['99NOMENC'];
            $CPT5++;

            If ( $CPT5 > 1) Printf ("\n</TABLE>\n\n</TD></TR>\n");
            Printf ("\n<TR><TD>");
            Printf ("\n<span class=aff_prod_table_b>%s, %s %s</span><br>",
			                htmlspecialchars($RR['LIB_TITRE']),
			                htmlspecialchars($RR['LIB_STITRE']),
                			htmlspecialchars($RR['LIB_MODELE']));

			Printf ("\n<TABLE BORDER=0>");
        }

 		$tmp = Trouve_Images_60( $PERE );
		If ( $MEMO_PERE2 [$PERE] != 1 And $tmp <> '' )
			Printf ("<TR><TD bgcolor=white valign=top width=100px><Img src=\"%s\" border=0></TD>\n" , $tmp);
		Else
			Printf ("<TR><TD bgcolor=white valign=top width=100px>&nbsp;</TD>\n" );
		$MEMO_PERE2 [$PERE]  = 1;

		Printf ("<TD bgcolor=white valign=top width=800px>\n<b><a href=maj_article_c.php?ARTI=$ARTI>[M]</a> ");

    	Printf ( "\n\n<span onmouseover=\"affichePhoto('<b>%s</b> %s<br><br><center><img src=%s>');\" onmouseout=\"effacePhoto();return false;\">\n" , $ARTI , htmlspecialchars($RA['99DESI']) , Trouve_Images_160(  $PERE ) );

        Printf("<a href=\"http://www.trenois.com/fiche_produit.php?ARTI=%s\">%s</a></b> %s %s</span>",
            $ARTI, $ARTI, '' , htmlspecialchars($RA['99DESI']));
		Printf ("\n</TD></TR>\n");
    }







    Function Trouve_Images_60($ARTI)
    {
        Global $G_DIR_IMG;

        $ARTI = Trim(StrToLower($ARTI));
        If ( $ARTI == '' ) Return '';
        If (File_Exists("$G_DIR_IMG/images_produits/60/$ARTI.gif"))
            return "images_produits/60/$ARTI.gif";

        Else
            return "";
    }


    Function Trouve_Images_160($ARTI)
    {
        Global $G_DIR_IMG;

        $ARTI = Trim(StrToLower($ARTI));
         If ( $ARTI == '' ) Return '';
        If (File_Exists("$G_DIR_IMG/images_produits/160/$ARTI.jpg"))
            return "images_produits/160/$ARTI.jpg";
        Else
            return "";

    }

?>