//Inladen ingrediënten
$(document).ready(function () {
	time = new Date().getTime() / 1000;
	timestamp = window.sessionStorage.getItem('timestamp');
	console.log(time, timestamp, time-timestamp);
	if((time - timestamp) > 1200 || timestamp == null){
		window.location.replace("index.html");
		loadMenuItem();
	}
	else{
	loadGegevens();
	}
});

function updateGegevens(voornaam, achternaam, emailadres, geboortedatum, gewicht, lengte, geslacht, activiteit, gebruikersnaam){
	var url = "restservices/gebruiker/updategebruiker?Q1=" + voornaam + "&Q2=" + achternaam + "&Q3=" + emailadres + "&Q4=" + geboortedatum + "&Q5=" + gewicht + "&Q6=" + lengte + "&Q7=" + geslacht + "&Q8=" + activiteit + "&Q9=" + gebruikersnaam;
		$.ajax({
			url : url,
			method : "GET",
			beforeSend : function(xhr) {
				var token = window.sessionStorage.getItem("sessionToken");
				xhr.setRequestHeader('Authorization', 'Bearer ' + token);
			},
			success : function(data) {
				document.getElementById('message').innerHTML = 'Ingrediënt succesvol opgeslagen. <br />';
				loadGegevens();
			},
			fail : function() {
				console.log("Failed");
			},
		});
}

function loadGegevens(){
	var url = "restservices/gebruiker?Q1=" + window.sessionStorage.getItem("huidigeGebruiker");
		$.ajax({
			url : url,
			method : "GET",
			beforeSend : function(xhr) {
				var token = window.sessionStorage.getItem("sessionToken");
				xhr.setRequestHeader('Authorization', 'Bearer ' + token);
			},
			success : function(data) {
				$(data).each(function (index) {
				  document.getElementById("voornaam").value = this.voornaam;
				  document.getElementById("achternaam").value= this.achternaam;
				  document.getElementById('emailadres').value=this.emailadres;
				  document.getElementById('geboortedatum').value=this.geboortedatum;
				  document.getElementById('gewicht').value=this.gewicht;
				  document.getElementById('lengte').value=this.lengte;
				  document.getElementById('geslacht').value=this.geslacht;
				  document.getElementById('activiteit').value=this.activiteit;
				});
			},
			fail : function() {
				console.log("Failed");
			},
		});
}

// UPDATE FUNCTION CALL
$(document).on('click', '#opslaan', function() {
	var gebruikersnaam = window.sessionStorage.getItem("huidigeGebruiker");
	var voornaam = document.getElementById('voornaam').value;
	var achternaam = document.getElementById('achternaam').value;
	var emailadres = document.getElementById('emailadres').value;
	var geboortedatum = document.getElementById('geboortedatum').value;
	var gewicht = document.getElementById('gewicht').value;
	var lengte = document.getElementById('lengte').value;
	var geslacht = document.getElementById('geslacht').value;
	var activiteit = document.getElementById('activiteit').value;
	if (true){
		updateGegevens(voornaam, achternaam, emailadres, geboortedatum, gewicht, lengte, geslacht, activiteit, gebruikersnaam);
	}
});