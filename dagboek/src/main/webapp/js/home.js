$(document).ready(function() {	
	time = new Date().getTime() / 1000;
	timestamp = window.sessionStorage.getItem('timestamp');
	console.log(time, timestamp, time-timestamp);
	if((time - timestamp) < 1200 & timestamp != null){
		document.getElementById("homepage").innerHTML = '<h2 class="center">Homepage</h2><p>Welkom! U kunt nu alle functionaliteiten van de website gebruiken.<br/><a href="dagboek.html">Dagboek</a><br/><a href="adviezen.html">Adviezen</a><br/><a href="overzicht.html">Overzicht</a><br/><a href="#" id="logout">Logout</a>';
		loadMenuItem();
	}
});

$(document).on('click', '#logout', function() {
	window.sessionStorage.setItem('timestamp', "");
	window.location.replace("index.html");
  });

$(document).ready(function() {
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

// Login token
$("#loginbutton").click(function(event) {
	var data = $("#loginform").serialize();
	var huidigeGebruiker = document.getElementById("gebruikersnaam").value;
	$.post("restservices/authentication", data, function(response) {
		var timestamp = new Date().getTime() / 1000;
		window.sessionStorage.setItem("timestamp", timestamp)
		window.sessionStorage.setItem("sessionToken", response);
		window.sessionStorage.setItem("huidigeGebruiker", huidigeGebruiker);
		document.getElementById("homepage").innerHTML = '<h2 class="center">Homepage</h2><p>U bent ingelogd. U kunt nu alle functionaliteiten van de website gebruiken.<br/><a href="dagboek.html">Dagboek</a><br/><a href="adviezen.html">Adviezen</a><br/><a href="overzicht.html">Overzicht</a><br/><a href="#" id="logout">Logout</a>';
		loadMenuItem();
	}).fail(function(jqXHR, textStatus, errorThrown) {
		console.log(textStatus);
		console.log(errorThrown);
	});
});

// Menu Item + Name Display
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