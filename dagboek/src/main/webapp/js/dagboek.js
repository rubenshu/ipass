// Storing the ingredients + setting the combobox
var ingredientenVandaag = [];
var ingredienten = [];
var recent;
var e = document.getElementById("macro-optie");
var selected = e.options[e.selectedIndex].value;

$(document).ready(function () {
time = new Date().getTime() / 1000;
		timestamp = window.sessionStorage.getItem('timestamp');
		console.log(time, timestamp, time-timestamp);
		if((time - timestamp) > 1200 || timestamp == null){
			window.location.replace("index.html");
			loadMenuItem();
		}
//Inladen ingrediënten
		else{
	loadIngredients(selected);
	
	$("#datepicker").datepicker({
		  onSelect: function(dateText) {
		    loadIngredients(selected);
		    window.sessionStorage.setItem("selectedDatepicker", dateText);
		    var selectedDatepicker = window.sessionStorage.getItem("selectedDatepicker");
		    document.getElementById("add-date").innerHTML = "Mijn adviezen voor " + selectedDatepicker;
		  }
		});
	recent = JSON.parse(localStorage.getItem("snelkiezer")) || [];
	console.log(recent);
		}
});

//Load ingredients from DB
function loadIngredients(selected) {	
	var username = window.sessionStorage.getItem("huidigeGebruiker");
	var datum = document.getElementById("datepicker").value;
	var url = "restservices/ingredients?Q1=" + username + "&Q2=" + datum;
		$.ajax({
			url : url,
			method : "GET",
			beforeSend : function(xhr) {
				var token = window.sessionStorage.getItem("sessionToken");
				xhr.setRequestHeader('Authorization', 'Bearer ' + token);
			},
			success : function(data) {
				$(".table").find("tr:gt(0):not(:last)").remove();
				ingredientenVandaag = [];
				 $(data).each(function (index) {
					 ingredientenVandaag.push(this.ingredientnaam);
					 var subtotaal = (this.hoeveelheid * this[selected]) / 100;
					 $(".table").find('tr:last').prev().after('<tr><td class="ingredient">'+this.ingredientnaam+'</td><td class="hoeveelheid">'+this.hoeveelheid+'</td><td class="subtotaal">'+subtotaal.toFixed(1)+'</td><td class="removeingredient"><a href="#"> <i class="fa fa-times text-red"></i></a></td></tr>');
					});
				 loadTotals();
				 loadAllIngredients();
			},
			error: function(xhr){
				$(".dagboektable").html('Ophalen ingrediënten mislukt.');
			},
		});
}



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
			},
		});
	return ingredienten;
}

function insertIngredient(ingredientnaam, hoeveelheid){
	var datum = document.getElementById("datepicker").value;
	var username = window.sessionStorage.getItem("huidigeGebruiker");
	var url = "restservices/ingredients/insert?Q1=" + hoeveelheid + "&Q2=" + datum + "&Q3=" + ingredientnaam + "&Q4=" + username;
		$.ajax({
			url : url,
			method : "GET",
			beforeSend : function(xhr) {
				var token = window.sessionStorage.getItem("sessionToken");
				xhr.setRequestHeader('Authorization', 'Bearer ' + token);
			},
			success : function(data) {
				ingredientenVandaag.push(ingredientnaam);
				 $(data).each(function (index) {
					 var subtotaal = (this.hoeveelheid * this[selected]) / 100;
					 $(".table").find('tr:last').prev().after('<tr><td class="ingredient">'+this.ingredientnaam+'</td><td class="hoeveelheid">'+this.hoeveelheid+'</td><td class="subtotaal">'+subtotaal+'</td><td class="removeingredient"><a href="#"> <i class="fa fa-times text-red"></i></a></td></tr>');
					});
				loadTotals();
			},
			fail : function() {
				console.log("Failed");
			},
		});
}

function deleteIngredient(ingredientnaam){
	var datum = document.getElementById("datepicker").value;
	var username = window.sessionStorage.getItem("huidigeGebruiker");
	var url = "restservices/ingredients/delete?&Q1=" + ingredientnaam + "&Q2=" + datum + "&Q3=" + username;
	$.ajax({
		url : url,
		method : "GET",
		beforeSend : function(xhr) {
			var token = window.sessionStorage.getItem("sessionToken");
			xhr.setRequestHeader('Authorization', 'Bearer ' + token);
		},
		success : function(data) {
			var index = ingredientenVandaag.indexOf(ingredientnaam);
			ingredientenVandaag.splice(index, 1);
			$(".table td:contains("+ingredientnaam+")").parent().remove();
			loadTotals();
		},
		fail : function() {
			console.log("Failed");
		},
	});
}

function updateIngredient(ingredientnaam){
	var datum = document.getElementById("datepicker").value;
	var username = window.sessionStorage.getItem("huidigeGebruiker");
	var url = "restservices/ingredients/update?&Q1=" + ingredientnaam + "&Q2=" + datum + "&Q3=" + username;
	$.ajax({
		url : url,
		method : "GET",
		beforeSend : function(xhr) {
			var token = window.sessionStorage.getItem("sessionToken");
			xhr.setRequestHeader('Authorization', 'Bearer ' + token);
		},
		success : function(data) {
			console.log("Succes");
			//$(".table td:contains("+ingredientnaam+")").parent().remove();
			loadTotals();
		},
		fail : function() {
			console.log("Failed");
		},
	});
}

//Onchange hoeveelheid
$('#gramtext').bind('input', function() { 
	console.log("Y");
	var hoeveelheid = $(this).val();
	console.log(hoeveelheid);
});

//Onclick remove ingredient
    $('.table tbody').on( 'click', '.removeingredient', function () {
        var ingredientnaam = $(this).parent().find('td').html().trim();
        deleteIngredient(ingredientnaam);
    });

//Vars for below functions
var inputBox = document.getElementById('ingredient');
var inputBoxGram = document.getElementById('gram');
var lastIngredient;

//Ingredient zoeken
$(document).ready(function(){
document.getElementById('ingredient').onkeyup = function(evt) {
    $("#autocomplete").empty();
    var query = $('#ingredient').val();
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

});

// Snelkiezer
$(document).ready(function() {
  $("#recent, #recentcomplete").hover(function() {
    $("#recentcomplete").empty();
    document.getElementById("recentcomplete").style.display = "block";
    recent.forEach(function(item) {
      $("#recentcomplete").append('<li><a href="#">' + item + '</a></li>');
    });
  }, function() {
    document.getElementById("recentcomplete").style.display = "none";
  });
  $(document).on('click', '#recentcomplete a', function() {
    $('#recentcomplete').hide()
	lastIngredient = $(this).text();
	inputBox.value = lastIngredient;
  })

});

// Voeg toe
$(document).ready(function() {
  $(document).on('click', '#voegtoe', function() {
  if(inputBoxGram.value.length > 0 && ingredienten.includes(inputBox.value)){
	  var ingredientnaam = inputBox.value;
	  if (ingredientenVandaag.includes(ingredientnaam)){
		  alert("Ingrediënt al in de lijst. Verwijder deze en voeg opnieuw toe.");
	  }
	  else{
		  insertIngredient(inputBox.value, inputBoxGram.value);
		  
		  if (!recent.includes(ingredientnaam)){
			  if (recent.length > 9){
				  console.log(recent);
				  recent.splice(0,0, ingredientnaam);
				  recent.length = 9;
				  console.log(recent);
				  window.localStorage.setItem("snelkiezer", JSON.stringify(recent));
			  }
			  else{
			  recent.push(ingredientnaam);
			  window.localStorage.setItem("snelkiezer", JSON.stringify(recent));
			  }
		  }
		  else{
			  console.log("In lijst");
		  }
	  }
  }
  else{alert('Foutieve waardes. Controleer');}
});
});

//Onchange dropdown selection
$("#macro-optie").on('change', function() {
    var optionSelected = $("option:selected", this);
    var valueSelected = this.value;
    loadIngredients(valueSelected);
});

function loadTotals() {
	totals("totaal", 3);
}

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