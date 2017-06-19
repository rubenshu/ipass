//Inladen ingrediënten
$(document).ready(function () {
	time = new Date().getTime() / 1000;
	timestamp = window.sessionStorage.getItem('timestamp');
	console.log(time, timestamp, time-timestamp);
	if((time - timestamp) > 1200 || timestamp == null){
		window.location.replace("index.html");
	}
	else{
		loadMenuItem();
	loadGegevens();
	}
});

//Logout
$(document).ready(function() {
	$(document).on('click', '#logout', function() {
		window.sessionStorage.removeItem('timestamp');
		window.sessionStorage.removeItem('sessionToken');
		window.sessionStorage.removeItem('huidigeGebruiker')
		window.location.replace("index.html");
	  });

});

//Update gegevens
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
				if (data == "true"){
				document.getElementById('message').innerHTML = 'Gegevens succesvol opgeslagen. <br />';
				loadGegevens();
			}
				else{
					alert("Opslaan niet gelukt.");
				}

			},
			fail : function() {
				console.log("Failed");
			},
		});
}

//Load gegevens
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
	  if (gebruikersnaam.length > 0& voornaam.length > 0& achternaam.length > 0& emailadres.length > 0& geboortedatum.length > 0& gewicht.length > 0& lengte.length > 0& geslacht.length > 0& activiteit.length > 0){
		  updateGegevens(voornaam, achternaam, emailadres, geboortedatum, gewicht, lengte, geslacht, activiteit, gebruikersnaam);  
	  }
		  else{
			  alert("Niet alle waarden zijn ingevuld.");
		  }
});

//Usermenu
$("#gebruikersnaammenu, #autouser").hover(function(){
	console.log("Y");
    document.getElementById("autouser").style.display = "block";
},function(){
    document.getElementById("autouser").style.display = "none";
});
$(document).on('click', '#gebruikersnaammenu a', function() {
  document.getElementById("autouser").style.display = "none";
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