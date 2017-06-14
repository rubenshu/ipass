// Storing the ingredients
var ingredienten = [];

//Inladen ingrediënten
$(document).ready(function () {
	loadIngredients("calorieen");
	
	$("#datepicker").datepicker({
		  onSelect: function(dateText) {
		    loadIngredients("calorieen");
		  }
		});
	
	//Change total when other macro is selected in dagboek
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
				 $(data).each(function (index) {
					 $(".table").find('tr:last').prev().after('<tr><td class="ingredient">'+this.ingredientnaam+'</td><td class="hoeveelheid"><input class="gramtxt" type="text" value="'+this.hoeveelheid+'" name="gramtxt" id="gramtxt"></td><td class="subtotaal">'+this[selected]+'</td><td class="removeingredient"><a href="#"> <i class="fa fa-times text-red"></i></a></td></tr>');
					});
				 loadTotals();
				 loadAllIngredients();
			},
			error: function(xhr){
				$(".dagboektable").html('Ophalen ingrediënten mislukt. Ben je ingelogd?');
			},
		});
}



function loadAllIngredients(){
	var url = "restservices/loadingredients/all";
		$.ajax({
			url : url,
			method : "GET",
			beforeSend : function(xhr) {
				var token = window.sessionStorage.getItem("sessionToken");
				xhr.setRequestHeader('Authorization', 'Bearer ' + token);
			},
			success : function(data) {
				$(data).each(function (index) {
					 ingredienten.push(this.ingredientnaam);
					 });
			},
		});
	return ingredienten;
}

function InsertIngredient(){
	var hoeveelheid = inputBoxGram = document.getElementById('gram').value;
	var datum = document.getElementById("datepicker").value;
	var ingredientnaam = document.getElementById('ingredient').value;
	var username = window.sessionStorage.getItem("huidigeGebruiker");
	var url = "restservices/ingredients?Q1=" + username + "&Q2=" + datum;
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
  var recent = ["Appel", "Aardbei", "Aardappelen", "Banaan", "Bananen", "Banana", "Druif"];
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
  if(/^[a-z]+$/i.test(inputBox.value) && inputBoxGram.value.length > 0){
	  //insertIngredient();
  $(".table").find('tr:last').prev().after('<tr><td class="ingredient">'+inputBox.value+'</td><td class="hoeveelheid"><input class="gramtxt" type="text" value="'+inputBoxGram.value+'" name="gramtxt" id="gramtxt"></td><td class="subtotaal">100</td><td class="removeingredient"><a href="#"><i class="fa fa-times text-red"></i></a></td></tr>');
  totals("totaal", 3);
  }
  else{alert('Foutieve waardes. Controleer');}
});
});
//Onchange hoeveelheid
$('#gramtext').bind('input', function() { 
	console.log("Changed: " + $(this).val())
});

$("#macro-optie").on('change', function() {
    var optionSelected = $("option:selected", this);
    var valueSelected = this.value;
    loadIngredients(valueSelected);
});

function loadTotals() {
	totals("totaal", 3);
}