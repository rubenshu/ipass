// Select current menu item
$(document).ready(function() {
	if(sessionStorage.getItem("sessionToken") !== null){
		document.getElementById("homepage").innerHTML = '<h2 class="center">Homepage</h2><p>U bent ingelogd. U kunt nu alle functionaliteiten van de website gebruiken.<br/><a href="dagboek.html">Dagboek</a><br/><a href="adviezen.html">Adviezen</a><br/><a href="overzicht.html">Overzicht</a>';
	}
});

// Login token
$("#loginbutton").click(function(event) {
	var data = $("#loginform").serialize();
	var huidigeGebruiker = document.getElementById("gebruikersnaam").innerHTML;
	$.post("restservices/authentication", data, function(response) {
		window.sessionStorage.setItem("sessionToken", response);
		window.sessionStorage.setItem("huidigeGebruiker", huidigeGebruiker);
		document.getElementById("homepage").innerHTML = '<h2 class="center">Homepage</h2><p>U bent ingelogd. U kunt nu alle functionaliteiten van de website gebruiken.<br/><a href="dagboek.html">Dagboek</a><br/><a href="adviezen.html">Adviezen</a><br/><a href="overzicht.html">Overzicht</a>';
	}).fail(function(jqXHR, textStatus, errorThrown) {
		console.log(textStatus);
		console.log(errorThrown);
	});
});