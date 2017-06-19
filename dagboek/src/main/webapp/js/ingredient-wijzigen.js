//Inladen ingrediënten
$(document).ready(function () {
	time = new Date().getTime() / 1000;
	timestamp = window.sessionStorage.getItem('timestamp');
	console.log(time, timestamp, time-timestamp);
	if((time - timestamp) > 1200 || timestamp == null){
		window.location.replace("index.html");
		loadMenuItem()	}
	else{
	loadAllIngredients();
	loadMenuItem();
	}
});

//Logout & user menu
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

//Storing the ingredients + setting the combobox
var ingredienten = [];
var inputBox = document.getElementById('ingredientnaam');

//Loading all ingredients
function loadAllIngredients(){
	var url = "restservices/ingredients/all";
		$.ajax({
			url : url,
			method : "GET",
			beforeSend : function(xhr) {
				var token = window.sessionStorage.getItem("sessionToken");
				xhr.setRequestHeader('Authorization', 'Bearer ' + token);
			},
			success : function(data) {
				ingredienten = [];
				$(data).each(function (index) {
					 ingredienten.push(this.ingredientnaam);
					 });
				console.log(ingredienten);
			},
		});
	return ingredienten;
}

//Updating an existing ingredient
function updateIngredient(ingredientnaam, calorieen, vet, verzadigd_vet, eiwit, koolhydraten, vezels, zout){
	var url = "restservices/ingredients/updateingredient?Q1=" + ingredientnaam + "&Q2=" + calorieen + "&Q3=" + vet + "&Q4=" + verzadigd_vet + "&Q5=" + eiwit + "&Q6=" + koolhydraten + "&Q7=" + vezels + "&Q8=" + zout;
		$.ajax({
			url : url,
			method : "GET",
			beforeSend : function(xhr) {
				var token = window.sessionStorage.getItem("sessionToken");
				xhr.setRequestHeader('Authorization', 'Bearer ' + token);
			},
			success : function(data) {
				if (data == "true"){
				document.getElementById('message').innerHTML = 'Ingrediënt succesvol opgeslagen. <br />';
				  document.getElementById("ingredientnaam").value = "";
				  document.getElementById("calorieen").value="";
				  document.getElementById('vet').value="";
				  document.getElementById('verzadigd_vet').value="";
				  document.getElementById('eiwit').value="";
				  document.getElementById('koolhydraten').value="";
				  document.getElementById('vezels').value="";
				  document.getElementById('zout').value="";
				}
				else{
					alert("Verwijderen niet gelukt");
				}
			},
			fail : function() {
				console.log("Failed");
			},
		});
}

//Load an ingredient
function loadIngredient(ingredientnaam){
	var url = "restservices/ingredients/ingredient?Q1=" + ingredientnaam;
		$.ajax({
			url : url,
			method : "GET",
			beforeSend : function(xhr) {
				var token = window.sessionStorage.getItem("sessionToken");
				xhr.setRequestHeader('Authorization', 'Bearer ' + token);
			},
			success : function(data) {
				$(data).each(function (index) {
				  document.getElementById("ingredientnaam").value = this.ingredientnaam;
				  document.getElementById("calorieen").value= this.calorieen;
				  document.getElementById('vet').value=this.vet;
				  document.getElementById('verzadigd_vet').value=this.verzadigd_vet;
				  document.getElementById('eiwit').value=this.eiwit;
				  document.getElementById('koolhydraten').value=this.koolhydraten;
				  document.getElementById('vezels').value=this.vezels;
				  document.getElementById('zout').value=this.zout;
				});
			},
			fail : function() {
				console.log("Failed");
			},
		});
}

//Remove an ingredient
function verwijderIngredient(ingredientnaam){
	var url = "restservices/ingredients/deleteingredient?Q1=" + ingredientnaam;
		$.ajax({
			url : url,
			method : "GET",
			beforeSend : function(xhr) {	
				var token = window.sessionStorage.getItem("sessionToken");
				xhr.setRequestHeader('Authorization', 'Bearer ' + token);
			},
			success : function(data) {
				if (data == "true"){
				document.getElementById('message').innerHTML = 'Ingrediënt succesvol verwijderd. <br />';
				  document.getElementById("ingredientnaam").value = "";
				  document.getElementById("calorieen").value="";
				  document.getElementById('vet').value="";
				  document.getElementById('verzadigd_vet').value="";
				  document.getElementById('eiwit').value="";
				  document.getElementById('koolhydraten').value="";
				  document.getElementById('vezels').value="";
				  document.getElementById('zout').value="";
			}
			else{
				alert("Verwijderen niet gelukt");
			}
			},
			fail : function() {
				console.log("Failed");
			},
		});
}

//Ingredient zoeken
$(document).ready(function(){
document.getElementById('ingredientnaam').onkeyup = function(evt) {
    $("#autocomplete").empty();
    var query = $('#ingredientnaam').val();
    // escape regex
    query = query.replace(
      /[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&"
    );
    var queryRegExp = new RegExp('^' + query, 'i');
    //Return dropdown results
    var results = ingredienten.filter(function(item) {
        return queryRegExp.test(item);
    });
   //Print dropdown results
    results.forEach(function(item) {
        $("#autocomplete").append('<li><a href="#" class="item">' + item + '</a></li>');
    });
	
$('#autocomplete a').click(function () {
    lastIngredient = $(this).text();
    loadIngredient(lastIngredient);
});

//Show/hide dropdown logic
if(inputBox.value.length >= 1){
document.getElementById("autocomplete").style.display = "block";}
else{document.getElementById("autocomplete").style.display = "none";}}

  $(document).on('click', '.item', function() {
	  $('#autocomplete').hide();
	  inputBox.value = lastIngredient;
  })
  
$(document).click(function() {
    document.getElementById("autocomplete").style.display = "none";
});

$("#autocomplete").hover(function(){
    document.getElementById("autocomplete").style.display = "block";
},function(){
    document.getElementById("autocomplete").style.display = "none";
});

// UPDATE FUNCTION CALL
$(document).on('click', '#ingredientopslaan', function() {
	var ingredientnaam = document.getElementById('ingredientnaam').value;
	var calorieen = document.getElementById('calorieen').value;
	var vet = document.getElementById('vet').value;
	var verzadigd_vet = document.getElementById('verzadigd_vet').value;
	var eiwit = document.getElementById('eiwit').value;
	var koolhydraten = document.getElementById('koolhydraten').value;
	var vezels = document.getElementById('vezels').value;
	var zout = document.getElementById('zout').value;
	if (calorieen.length > 0 & vet.length > 0 & verzadigd_vet.length > 0 & eiwit.length > 0 & koolhydraten.length > 0 & vezels.length > 0 & zout.length > 0){
		if (ingredienten.includes(ingredientnaam)){
		updateIngredient(ingredientnaam, calorieen, vet, verzadigd_vet, eiwit, koolhydraten, vezels, zout);
		}
		else{
			alert("Ingevulde ingrediëntnaam bestaat niet.");
		}
	}
	else{
		alert("Niet alle waardes zijn ingevuld.");
	}
});

// DELETE FUNCTION CALL
$(document).on('click', '#ingredientverwijderen', function() {
	var ingredientnaam = document.getElementById('ingredientnaam').value;
	var result = confirm("Weet je zeker dat je "+ingredientnaam+" wilt verwijderen?");
	if (result) {
		verwijderIngredient(ingredientnaam);
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