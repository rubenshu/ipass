//VARIABLES
var ingredientnaam = document.getElementById('ingredientnaam');
var calorieen = document.getElementById('calorieen');
var vet = document.getElementById('vet');
var verzadigd_vet = document.getElementById('verzadigd_vet');
var eiwit = document.getElementById('eiwit');
var koolhydraten = document.getElementById('koolhydraten');
var vezels = document.getElementById('vezels');
var zout = document.getElementById('zout');

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
				console.log("Succes");
				document.getElementById('h5-message').innerHTML += '<span style="color:green">Ingrediënt succesvol toegevoegd.</span>'
				console.log(ingredientnaam);
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
	  if (true){
		  insertNewIngredient(ingredientnaam, calorieen, vet, verzadigd_vet, eiwit, koolhydraten, vezels, zout);
	  }
});
});