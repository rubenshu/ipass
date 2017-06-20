$(document).ready(function () {
	time = new Date().getTime() / 1000;
	timestamp = window.sessionStorage.getItem('timestamp');
	if((time - timestamp) > 1200 || timestamp == null){
		window.location.replace("index.html");
	}
	else{
		loadMenuItem();
	}
});

//Logout & usermenu
$(document).ready(function() {
	$(document).on('click', '#logout', function() {
		window.sessionStorage.removeItem('timestamp');
		window.sessionStorage.removeItem('sessionToken');
		window.sessionStorage.removeItem('huidigeGebruiker')
		window.location.replace("index.html");
	  });
	
	$("#gebruikersnaammenu, #autouser").hover(function(){
	    document.getElementById("autouser").style.display = "block";
	},function(){
	    document.getElementById("autouser").style.display = "none";
	});
  $(document).on('click', '#gebruikersnaammenu a', function() {
	  document.getElementById("autouser").style.display = "none";
  });

});

//VARIABLES
function insertNewIngredient(ingredientnaam, calorieen, vet, verzadigd_vet, eiwit, koolhydraten, vezels, zout){
	var url = "restservices/ingredients/insertingredient?Q1=" + ingredientnaam + "&Q2=" + calorieen + "&Q3=" + vet + "&Q4=" + verzadigd_vet + "&Q5=" + eiwit + "&Q6=" + koolhydraten + "&Q7=" + vezels + "&Q8=" + zout;
	if (ingredientnaam.length > 0, calorieen.length > 0, vet.length > 0, verzadigd_vet.length > 0, eiwit.length > 0, koolhydraten.length > 0, vezels.length > 0, zout.length > 0){	
	$.ajax({
			url : url,
			method : "POST",
			beforeSend : function(xhr) {
				var token = window.sessionStorage.getItem("sessionToken");
				xhr.setRequestHeader('Authorization', 'Bearer ' + token);
			},
			success : function(data) {
				document.getElementById('message').innerHTML = 'Ingrediënt succesvol toegevoegd. <br />';
				$('html, body').animate({ scrollTop: 0 }, 'fast');
				  document.getElementById("ingredientnaam").value = "";
				  document.getElementById("calorieen").value="";
				  document.getElementById('vet').value="";
				  document.getElementById('verzadigd_vet').value="";
				  document.getElementById('eiwit').value="";
				  document.getElementById('koolhydraten').value="";
				  document.getElementById('vezels').value="";
				  document.getElementById('zout').value="";
			},
			fail : function() {
				console.log("Failed");
			},
		});
	}
	else{
		alert("Onjuiste waardes ingevuld. Controleer de velden.");
	}
}

// Voeg toe
$(document).ready(function() {
  $(document).on('click', '#voegtoe', function() {
	  //Check for AS
	  var ingredientnaam = document.getElementById("ingredientnaam").value;
	  var calorieen = document.getElementById("calorieen").value;
	  var vet = document.getElementById('vet').value;
	  var verzadigd_vet = document.getElementById('verzadigd_vet').value;
	  var eiwit = document.getElementById('eiwit').value;
	  var koolhydraten = document.getElementById('koolhydraten').value;
	  var vezels = document.getElementById('vezels').value;
	  var zout = document.getElementById('zout').value;
	  if (true){
		  insertNewIngredient(ingredientnaam, calorieen, vet, verzadigd_vet, eiwit, koolhydraten, vezels, zout);
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