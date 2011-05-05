<?

/* Access As400 via OLWEB */
$G_SERVICE_PORT	= 6030;
$G_ADDRESS 		= '128.1.1.12';

Class AS400 {


var $G_SOCKET;

Function AS400 () {  // Constructeur
Global $G_ADDRESS, $G_SERVICE_PORT;

	/* Cree une socket TCP/IP. */
	$this->G_SOCKET = socket_create(AF_INET, SOCK_STREAM, SOL_TCP);
	If ($this->G_SOCKET < 0) {
	    Echo "socket_create() a échoué : raison :  " . socket_strerror(socket_last_error()) . "\n";
	    Exit;
	}
	For ( $i = $G_SERVICE_PORT ; $i < $G_SERVICE_PORT+5 ; ++$i ) {
		$result = @socket_connect($this->G_SOCKET, $G_ADDRESS, $i);
		If ( $result ) Break;
	}


	If ( $i == $G_SERVICE_PORT+5 ) {
	Printf( "<br>I %d  ser %d " . $i, $G_SERVICE_PORT+5 );
	    	Echo "socket_connect() a échoué : de $G_SERVICE_PORT à $i " . socket_strerror(socket_last_error()) . "\n";
	    	Exit;
	}

}


Function __call($name , $arguments) {
        Die ( "Vous tentez d appeler la méthode $name de la classe AS400");
}



Function AS_NOP ( ) {

	$in = sprintf("NOP%s",  Str_Pad('', 10));
	socket_write($this->G_SOCKET, $in, strlen($in));
 	$out = '';
	while ($out .= socket_read($this->G_SOCKET, 10))
		If ( strlen( $out ) >= 10 ) break;

	return $out;
}



Function AS_APX ($pgm, $param ) {

	$in = sprintf("APX0000%s%s",
		str_pad(StrToUpper($pgm), 10), Str_Pad($param, 255));
	socket_write($this->G_SOCKET, $in, strlen($in));
	$out = '';
	while ($out .= socket_read($this->G_SOCKET, 269))
		If ( strlen( $out ) >= 269 ) break;

	return $out;
}



Function AS_APP ($pgm, $param, $session) {

	$in = sprintf("APP0000%s%s%s",
		str_pad(StrToUpper($pgm), 10), Str_Pad($param, 255), Str_Pad($session, 20));
	socket_write($this->G_SOCKET, $in, strlen($in));
	$z = 0; $out = '';
	while (1) {
		$out .= socket_read($this->G_SOCKET, 289 - strlen ( $out)) ;
		If ( strlen( $out ) >= 289 ) break;
	}
	$handle = fopen ( $session , "w");
	$z = 0; $out = '';
	while ($out = socket_read($this->G_SOCKET, 2048)) {

		$z += substr_count ( $out , chr(0));
		fwrite ( $handle, str_replace ( chr(0), '', $out)) ;
		If ( $z > 255 ) break;
	}
	fclose ( $handle);
}



Function AS_FIN () {

	socket_write($this->G_SOCKET, "FIN",  3);
	socket_shutdown ($this->G_SOCKET);
	socket_close($this->G_SOCKET);

}



Function AS_FIP () {

	socket_write($this->G_SOCKET, "FIP",  3);
	socket_shutdown ($this->G_SOCKET);
	socket_close($this->G_SOCKET);

}



Function AS_STO ($dep, $arti ) {
Global $G_SOCI;

	$in = sprintf("STO0000%s%s%s%s",
		$G_SOCI,  str_pad( StrToUpper($arti), 8) , str_pad(StrToUpper($dep), 3 ), str_pad('', 15*15));
	socket_write($this->G_SOCKET, $in, strlen($in));
	$out = '';
	while ($out .= socket_read($this->G_SOCKET, 242))
		If ( strlen( $out ) >= 242 ) break;

	for ( $i=0, $k=16 ; $i<15 ; ++$i ) {
		$sto[$i] = ((float ) substr( $out , $k , 15 )) / 10000;
		$k += 15;
	}
	return $sto;
}



Function AS_CKC ($clie ) {
Global $G_SOCI;

	$out = '';$in = sprintf("CKC0000%s%06d0",  $G_SOCI, Trim($clie) );
	socket_write($this->G_SOCKET, $in, strlen($in));

	while ($out .= socket_read($this->G_SOCKET, 13))
		If ( strlen( $out ) >= 13 ) break;
	return $out;
}



Function AS_CLM ($clie ,$tel, $fax, $mal , $web , $pwd ) {
Global $G_SOCI;

	$out = '';$in = sprintf("CLM0000%s%06d%s%s%s%s%s",  $G_SOCI, Trim($clie) ,
		str_pad( StrToUpper( Substr($tel,0,17)), 17) ,
		str_pad( StrToUpper( Substr($fax,0,17)), 17) ,
		str_pad( StrToUpper( Substr($mal,0,40)), 40) ,
		str_pad( StrToUpper( Substr($web,0,40)), 40) ,
		str_pad( StrToUpper( Substr($pwd,0,10)), 10)
		);
	socket_write($this->G_SOCKET, $in, strlen($in));
	// die ( strlen($in) . " $in ");
	while ($out .= socket_read($this->G_SOCKET, 136))
		If ( strlen( $out ) >= 136 ) break;
	return ;
}



Function AS_TAR ($clie, $arti, $qte ) {
Global $G_SOCI;

	$out = '';$in = sprintf("TAR0000N%s%06d%s%07d0000%011d",
		$G_SOCI, Trim($clie), Str_Pad( StrToUpper( Substr($arti, 0, 8)), 8), $qte, 0
		);

	socket_write($this->G_SOCKET, $in, strlen($in));
	// die ( strlen($in) . " $in ");
	while ($out .= socket_read($this->G_SOCKET, 43))
		If ( strlen( $out ) >= 43 ) break;

	return ((float ) substr( $out , -11 )) / 1000;
}



Function AS_PAL ($clie, $arti ) {
Global $G_SOCI;

	Query ( "SELECT * FROM wbtarif WHERE WB_CLIE=$clie And WB_ARTI='$arti'" , &$RES);
	If ( Fetch($RES , &$ROW ) != False ) {
		for ( $i=1; $i<=10 ; ++$i ) {
			$pal["P$i"] = $ROW["WB_TAR$i"];
			$pal["Q$i"] = $ROW["WB_ECH$i"];
		}
		return $pal;
	}
	$sql = "insert into wbtarif set WB_CLIE=$clie, WB_ARTI='$arti' ";
	$out = '';$in = sprintf("PAL0000%s%06d%s%s",
		$G_SOCI, $clie, Str_Pad( StrToUpper( Substr($arti, 0, 8)), 8), Str_Pad ('' , 220, '0')
		);


	socket_write($this->G_SOCKET, $in, strlen($in));

	while ($out .= socket_read($this->G_SOCKET, 240))
		If ( strlen( $out ) >= 240 ) break;
    // var_dump ( $out );
	for ( $i=1, $k=20 ; $i<=10 ; ++$i ) {
		$pal["Q$i"] = ((float ) substr( $out, $k   , 11)) / 10000;
		$pal["P$i"] = ((float ) substr( $out, $k+11, 11)) / 1000;
		$sql .= sprintf (" ,WB_TAR%d=%s , WB_ECH%d=%s " ,
			$i,  $pal["P$i"], $i, $pal["Q$i"]);
		$k += 22;
	}

	execute ( $sql );
	return $pal;
}


Function __destruct() {
	$this->AS_FIP();
}

}  // Classe AS
?>