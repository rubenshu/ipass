$(document).ready(function () {
	time = new Date().getTime() / 1000;
	timestamp = window.sessionStorage.getItem('timestamp');
	console.log(time, timestamp, time-timestamp);
	if((time - timestamp) > 1200 || timestamp == null){
		window.location.replace("index.html");
	}
});

//VARIABLES
function insertNewGebruiker(gebruikersnaam, wachtwoord, emailadres, voornaam, achternaam, geboortedatum, gewicht, lengte, geslacht, activiteit){
	var url = "restservices/gebruiker/insertgebruiker?Q1=" + gebruikersnaam + "&Q2=" + wachtwoord + "&Q3=" + emailadres + "&Q4=" + voornaam + "&Q5=" + achternaam + "&Q6=" + geboortedatum + "&Q7=" + gewicht + "&Q8=" + lengte + "&Q9=" + geslacht+ "&Q10=" + activiteit;
		$.ajax({
			url : url,
			method : "GET",
			beforeSend : function(xhr) {
				var token = window.sessionStorage.getItem("sessionToken");
				xhr.setRequestHeader('Authorization', 'Bearer ' + token);
			},
			success : function(data) {
				console.log("Succes");
			},
			fail : function() {
				console.log("Failed");
			},
		});
}

// Voeg toe
$(document).ready(function() {
  $(document).on('click', '#registreer', function() {
	  //Check for AS
	  var gebruikersnaam = document.getElementById("gebruikersnaam").value;
	  var wachtwoord = document.getElementById("wachtwoord").value;
	  var wachtwoord_verificatie = document.getElementById('wachtwoord-verificatie').value;
	  var emailadres = document.getElementById('emailadres').value;
	  var voornaam = document.getElementById('voornaam').value;
	  var achternaam = document.getElementById('achternaam').value;
	  var geboortedatum = document.getElementById('geboortedatum').value;
	  var gewicht = document.getElementById('gewicht').value;
	  var lengte = document.getElementById('lengte').value;
	  var geslacht = document.getElementById('geslacht').value;
	  var activiteit = document.getElementById('activiteit').value;
	  if (true){
		  insertNewGebruiker(gebruikersnaam, wachtwoord, emailadres, voornaam, achternaam, geboortedatum, gewicht, lengte, geslacht, activiteit);
	  }
});
});