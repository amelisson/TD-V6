<?


  $LS[0] = "Nouvelles références";
  $LS[1] = "Serrurerie";
  $LS[2] = "Contrôle d'accès";
  $LS[3] = "Béquillage";
  $LS[4] = "Ferme-portes";
  $LS[5] = "Charnières";
  $LS[6] = "Quincaillerie";
  $LS[7] = "Ferrures";
  $LS[8] = "Agencement";
  $LS[9] = "Outillage";
  $LS[10] = "Consommable";
  $LS[11] = "EPI";
  $LS[] = "Nouvelles références";



Function Affiche_Article ( $les_article , $type=0 ) {
	Global $G_SOCI;
	Require_Once('commun_cmd.php');

	$nb_article = count($les_article);
	$nb_page = floor($nb_article/12);
	$reste = $nb_article%12;
	if($reste != 0)
		$nb_page++;
	$cpt=0;

	echo "<div id='page'>";
	if($nb_page > 1)
	{
		echo "<span class=pagination onclick=debloque(1,".$nb_page.");return false;>Premier</span>";
		echo "<span class=pagination onclick=prec(".$nb_page.");return false;>Prec.</span>";

		for($i=1;$i<=$nb_page;$i++)
		{
			if($i%19==0)
				echo "<br /><br>";
			if($i==1)
				$classe="actuel";
			else
				$classe="pagination";

			echo "<span id=page".$i." class=".$classe." onclick=debloque(".$i.",".$nb_page.");return false;>".$i."</span>";
		}

		echo "<span class=pagination onclick=suiv(".$nb_page.");return false;>Suiv.</span>";
		echo "<span class=pagination onclick=debloque(".$nb_page.",".$nb_page.");  return false;>Dernier</span>";
		echo "<span id=all class=pagination onclick=debloque_all(".$nb_page.");return false;>Tout&nbsp;voir</span>";
	}
	echo "</div><br /><br />";

	ForEach ( $les_article as $ARTI ) {

		$SQL = "SELECT * FROM olarti00 Where ARSOCI='$G_SOCI' AND ARARTI='$ARTI'  ";
	    Query( $SQL, $RES);
	 	If ( Fetch($RES, $R))
		 {
		 	$PVM = Prix_Vente_Article_Client( $_COOKIE['TARIF'], $R['ARARTI'] );
		 	If ( $R['ARCOLNB1'] != 0 ) {
		 		$PCB = sPrintf("Par %d ",   $R['ARCOLNB1'] );
		 		If ( $R['ARCOLNB2'] != 0 )
		 			$PCB .= sPrintf(" , ou %d ",   $R['ARCOLNB2'] );
		 		} ElseIf ( $R['ARCOLNB2'] != 0 )
		 			$PCB = sPrintf("Par %d ",   $R['ARCOLNB2'] );
			$cpt++;
	 		Switch ( $type ) {
	 			case 0:

					if($cpt%12==1)
					 {
						if($cpt==1)
							$classe="unlock";
						else
							$classe="lock";

						echo "\n<div id=vignette". (floor($cpt/12)+1) ." class=".$classe.">";
					 }

					Printf ("\n\n<div class='vignetteSelection'>\n<a href='fiche_produit.php?A=%s'>"
							. "\n\t<div class='vignetteSelectionZonePhoto' align='center'>"
							. "<img src= http://www.importdistribution.be/photos/small/%s.jpg></div>"
							. "\n\t<div class='vignetteSelectionZoneTexteProduit' align='center'>%s</div>"
							. "\n\t<div class='vignetteSelectionZonePrix' align='center'>%.2f &euro;&nbsp;"
							. "\n\t<span class='pcb'>%s</span>\n\t</div>"
							. "\n</a>\n</div>",

							$R['ARARTI'], $R['ARARTI'],   Ucfirst(Strtolower($R['ARDESI'])), $PVM, $PCB  );

					if($cpt%12==0 ||$cpt==$nb_article)
						echo "\n</div>";

					break;
			} //end switch
		 } //end if

	} // end foreach

	if ( $type == 0 ) Echo "\n<br class=clearfloat>";

	?>
		<script type="text/javascript">

			var now=1;
			var obj;
			var vig;
			var page;

			function debloque(id,total)
			  {

				for(i=1;i<=total;i++)
				{
					page= "page"+i;
					obj = window.document.getElementById(page);
					obj.className="pagination";

					vig = "vignette"+i;
					obj = window.document.getElementById(vig);
					obj.className="lock";
				}

					obj = window.document.getElementById("all");
					obj.className="pagination";

					page= "page"+id;
					obj = window.document.getElementById(page);
					obj.className="actuel";

					vig = "vignette"+id;
					obj = window.document.getElementById(vig);
					obj.className="unlock";
					now=id;
			  }


			function prec(total)
			  {
				  if(now >1)
					{
						for(i=1;i<=total;i++)
						{
							page= "page"+i;
							obj = window.document.getElementById(page);
							obj.className="pagination";

							vig = "vignette"+i;
							obj = window.document.getElementById(vig);
							obj.className="lock";
						}

							obj = window.document.getElementById("all");
							obj.className="pagination";

							now--;
							vig = "vignette"+now;
							obj = window.document.getElementById(vig);
							obj.className="unlock";

							page= "page"+now;
							obj = window.document.getElementById(page);
							obj.className="actuel";

					}
			  }

			function suiv(total)
			  {
				  if(now < total)
					{
						for(i=1;i<=total;i++)
						{
							vig = "vignette"+i;
							obj = window.document.getElementById(vig);
							obj.className="lock";

							page= "page"+i;
							obj = window.document.getElementById(page);
							obj.className="pagination";
						}

							obj = window.document.getElementById("all");
							obj.className="pagination";

							now++;
							vig = "vignette"+now;
							obj = window.document.getElementById(vig);
							obj.className="unlock";

							page= "page"+now;
							obj = window.document.getElementById(page);
							obj.className="actuel";

					}
			  }

			function debloque_all(total)
			  {
					for(i=1;i<=total;i++)
					{
						vig = "vignette"+i;
						obj = window.document.getElementById(vig);
						obj.className="unlock";

						page= "page"+i;
						obj = window.document.getElementById(page);
						obj.className="pagination";
					}

						obj = window.document.getElementById("all");
						obj.className="actuel";

			  }

		</script>
	<?

}




?>