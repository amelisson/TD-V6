<?
    Header ("location: r.php");

?>
<html>

<head>
	<title>Ajax auto-suggest / auto-complete | BrandSpankingNew</title>
	<link rel="stylesheet" href="css/autosuggest_inquisitor.css" type="text/css" media="screen" charset="utf-8" />
	<link rel="stylesheet" href="css/css1.css" type="text/css" media="screen" charset="utf-8" />
	<script type="text/javascript" src="scripts/bsn.AutoSuggest_c_2.0.js"></script>

</head>

<body style="background-color: white; text-align: 	left; " >

<h2>Exemple</h2>

<blockquote><blockquote>
<div>
<form method="get" action="">
	<label for="testinput_xml">Désignation </label>
	<input type="text" id="testinput_xml" value="" style="width:300px" />
	<br /><br /><input type="submit" value="Et hop !" />
</form>
</div>



</body>

<script type="text/javascript">


	var options_xml = {
		script:"test2.php?",
		varname:"input",
		shownoresults: false,
		minchars: 3,
		timeout: 5000
	};
	var as_xml = new AutoSuggest('testinput_xml', options_xml);
</script>
