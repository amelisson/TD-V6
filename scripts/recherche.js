

function getNewXMLHTTPA( ) {

   try {
	  return new XMLHttpRequest();
    } catch(e) {
	  try {
	    var aObj = new ActiveXObject("Msxml2.XMLHTTP");
	  } catch (e) {
	    try {
		  var aObj = new ActiveXObject("Microsoft.XMLHTTP");
	    } catch(e) {
		  return false;
	    }
      }
    }
      return aObj;
 }






function sidebar (thepar) {
	var xhr = getNewXMLHTTPA();
	var url = 'sidebar_ajax.php?P=' + thepar

	var frs = document.getElementById('FRS').value
	if ( frs != '' && frs != '*' ) url = url + '&FRS=' + frs

	xhr.onreadystatechange = function() { sidebar_ajax(xhr); };
	xhr.open("GET", url, true);
        xhr.setRequestHeader("If-Modified-Since", "Sat, 1 Jan 2000 00:00:00 GMT");
	xhr.send(null);
}


function sidebar_ajax (xhr)  {
    if (xhr.readyState == 4)

		if ( xhr.responseText != '' )   {
			///////// alert (  xhr.responseText );
			var i = xhr.responseText.indexOf( '<lance>', 1 );

			document.getElementById('SIDEBAR').innerHTML = xhr.responseText.substr(0 , i) ;

			var lance =  xhr.responseText.substr(i+7, 999999);
			// alert  ( lance );
			eval ( lance )
		}
}









function liste_produits ( thepar, thepage  ) {
	var xhr = getNewXMLHTTPA();


// Parcour dans les ss_ pour raz style

	parcours() ;

	document.getElementById("SS").value = thepar;

	var url = 'liste_produits_ajax.php?SS=' + thepar + '&PAGE=' + thepage + '&VIG=' + document.getElementById('VIG').value

	var frs = document.getElementById('FRS').value
	if ( frs != '' ) url = url + '&FRS=' + frs

	try {  document.getElementById('ss_' + thepar).style.color = 'red' ; }
	catch (e) {}


	xhr.onreadystatechange = function() { liste_produits_ajax(xhr); };
	xhr.open("GET", url, true);
    xhr.setRequestHeader("If-Modified-Since", "Sat, 1 Jan 2000 00:00:00 GMT");
	xhr.send(null);
}



function liste_produits_ajax (xhr)  {
    if (xhr.readyState == 4)
			if ( xhr.responseText != '' ) {
					//////   alert ( xhr.responseText );
					document.getElementById('LISTEPRODUITS').innerHTML = xhr.responseText ;
			}
}





function parcours () {

   var liNodes= document.getElementsByTagName("a" );

/////////// PARCOURS A TRAVERS LE DOM Liste des <a> si id == ss_ alors on change de couleur ////////////////////

   		for (var i = 0; i < liNodes.length; i++ ) {
   			var tmp = liNodes[i].getAttribute("id")
   			if ( tmp != null  && tmp.substr(0,3) == 'ss_' )
   		  		liNodes[i].style.color = 'black';
  		}

}




function affich ( val ) {
    	 document.getElementById("VIG").value = val;
    	 liste_produits (  document.getElementById("SS").value  , 1);
    	// document.frech.submit();
}



function avance () {

    if ( document.getElementById('avance').style.display == 'none' ||
    	 document.getElementById('avance').style.display == '') {
	 	 document.getElementById('avance').style.display = 'block';
	 	// document.getElementById('R_DESI').value = document.getElementById('R_RECH').value
	 	// document.getElementById('R_RECH').value = '';
	 	 document.getElementById('AVC').value = 'B';
	 	 }
	 else {
	 	 document.getElementById('avance').style.display = 'none';
	 	//  document.getElementById('R_RECH').value = document.getElementById('R_DESI').value
	 	//  document.getElementById('R_DESI').value='';
	 	  document.getElementById('AVC').value = 'N';
	 }
 }


 function preference () {

     if ( document.getElementById('pref').style.display == 'none' ||
     	  document.getElementById('pref').style.display == '') {
 	 	  document.getElementById('pref').style.display = 'block';
 	 	 }
 	 else {
 	 	 document.getElementById('pref').style.display = 'none';

 	 }
 }


 function memo_pref() {

 	var url

 	url = 'r.php?PREF=O' +
 			'&MAX_ARTICLE=' +
 			document.getElementById('MAX_ARTICLE').value +
 			'&MAX_LISTE=' +
 			document.getElementById('MAX_LISTE').value +
 			'&MAX_PERE=' +
 			document.getElementById('MAX_PERE').value +
 			'&MAX_VIGNETTE=' +
 			document.getElementById('MAX_VIGNETTE').value ;

 	// alert ( url );
 	document.location.replace(url);

 }



 function affichePhoto(code)
 {

 	document.getElementById('cadre_photo').innerHTML=code;
 	document.getElementById('cadre_photo').style.display="block";

 }


 function effacePhoto()
 {

 	document.getElementById('cadre_photo').style.display="none";
 	document.getElementById('cadre_photo').innerHTML='';

 }



function filtre_frs( frs ) {
	document.getElementById('FRS').value = frs;
	document.frech.submit();
}




function createCookie(name, value ) {

	var date = new Date();
	date.setTime(date.getTime()+( 24*60*60*1000));
	var expires = "; expires=" + date.toGMTString();

	document.cookie = name + "=" + value + expires + "; path=/";
}



function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
	var c = ca[i];

	while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}



function triChange ( value ) {

	createCookie ('TRI', value );

	var tmp = document.getElementById("SS").value;

	liste_produits ( tmp, 1);


}