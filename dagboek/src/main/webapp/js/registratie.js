$(document).ready(function () {
	time = new Date().getTime() / 1000;
	timestamp = window.sessionStorage.getItem('timestamp');
	console.log(time, timestamp, time-timestamp);
	if(timestamp != null){
		window.location.replace("index.html");
	}
});


$(document).ready(function() {
	$(document).on('click', '#logout', function() {
		window.sessionStorage.removeItem('timestamp');
		window.sessionStorage.removeItem('sessionToken');
		window.sessionStorage.removeItem('huidigeGebruiker')
		window.location.replace("index.html");
	  });
	
	$("#gebruikersnaammenu, #autouser").hover(function(){
		console.log("Y");
	    document.getElementById("autouser").style.display = "block";
	},function(){
	    document.getElementById("autouser").style.display = "none";
	});
  $(document).on('click', '#gebruikersnaammenu a', function() {
	  document.getElementById("autouser").style.display = "none";
  });

});

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
				document.getElementById('message').innerHTML = 'Registratie succesvol! U kunt nu inloggen op de <a href="index.html">homepagina</a> <br />';
				$('html, body').animate({ scrollTop: 0 }, 'fast');
				document.getElementById('gebruikersnaam').value = "";
				document.getElementById('wachtwoord').value = "";
				document.getElementById('wachtwoord-verificatie').value = "";
				document.getElementById('emailadres').value = "";
				document.getElementById('voornaam').value = "";
				document.getElementById('achternaam').value = "";
				document.getElementById('geboortedatum').value = "";
				document.getElementById('gewicht').value = "";
				document.getElementById('lengte').value = "";
				document.getElementById('geslacht').value = "";
				document.getElementById('activiteit').value = "";
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
	  if (geboortedatum.length > 0, gewicht.length > 0, lengte.length > 0, geslacht.length > 0, activiteit.length > 0, gebruikersnaam.length > 0, wachtwoord.length > 0, wachtwoord_verificatie.length > 0, emailadres.length > 0, voornaam.length > 0, achternaam.length > 0){
		  if (wachtwoord === wachtwoord_verificatie){
		  insertNewGebruiker(gebruikersnaam, wachtwoord, emailadres, voornaam, achternaam, geboortedatum, gewicht, lengte, geslacht, activiteit);
		  }
		  else{
			  alert("Wachtwoorden komen niet overeen.");
			  document.getElementById('wachtwoord').value = "";
			  document.getElementById('wachtwoord-verificatie').value = "";
		  }
	}
	  else{
		  alert("Niet alles is ingevuld.");
	  }
});
});

//Menu Item + Name Display
function loadMenuItem(){
	var gebruikersnaam = window.sessionStorage.getItem("huidigeGebruiker");
	var url = "restservices/gebruiker?Q1=" + gebruikersnaam;
		$.ajax({
			url : url,
			method : "GET",
			beforeSend : function(xhr) {
				var token = window.sessionStorage.getItem("sessionToken");
				xhr.setRequestHeader('Authorization', 'Bearer ' + token);
			},
			success : function(data) {
				$(data).each(function (index) {
					document.getElementById('gebruikersnaammenu').innerHTML = this.voornaam;
					
				if (this.role == "admin"){
					var adminli = '<li><a href="ingredient-wijzigen.html">Ingrediënt wijzigen</a></li>';
					$(".autouser li:last-child").before (adminli);
				}
				});
			},
			fail : function() {
				console.log("Failed");
			},
		});
}