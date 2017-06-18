$(document).ready(function () {
	time = new Date().getTime() / 1000;
	timestamp = window.sessionStorage.getItem('timestamp');
	console.log(time, timestamp, time-timestamp);
	if((time - timestamp) > 1200 || timestamp == null){
		window.location.replace("index.html");
	}
});

//VARIABLES
function insertNewIngredient(ingredientnaam, calorieen, vet, verzadigd_vet, eiwit, koolhydraten, vezels, zout){
	var url = "restservices/ingredients/insertingredient?Q1=" + ingredientnaam + "&Q2=" + calorieen + "&Q3=" + vet + "&Q4=" + verzadigd_vet + "&Q5=" + eiwit + "&Q6=" + koolhydraten + "&Q7=" + vezels + "&Q8=" + zout;
		$.ajax({
			url : url,
			method : "GET",
			beforeSend : function(xhr) {
				var token = window.sessionStorage.getItem("sessionToken");
				xhr.setRequestHeader('Authorization', 'Bearer ' + token);
			},
			success : function(data) {
				document.getElementById('message').innerHTML = 'Ingrediënt succesvol toegevoegd. <br />';
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