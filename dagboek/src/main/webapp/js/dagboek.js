//Inladen ingrediënten
$(document).ready(function () {
	loadIngredients();
	
	$("#datepicker").datepicker({
		  onSelect: function(dateText) {
		    loadIngredients();
		  }
		});
});

//Global vars
var inputBox = document.getElementById('ingredient');
var inputBoxGram = document.getElementById('gram');
var lastIngredient;

//Load ingredients from JSON test file
function loadIngredients() {	
	var username = window.sessionStorage.getItem("huidigeGebruiker");
	var datum = document.getElementById("datepicker").value;
	var url = "restservices/loadingredients?Q1=" + username + "&Q2=" + datum;
		$.ajax({
			url : url,
			method : "GET",
			beforeSend : function(xhr) {
				var token = window.sessionStorage.getItem("sessionToken");
				xhr.setRequestHeader('Authorization', 'Bearer ' + token);
			},
			success : function(data) {
				console.log(data);	
				$(".dagboektable").html('<div class="container bodyheader"><button type="submit" name="recent" id="recent" style="max-width: 150px;">snelkiezer</button><input type="text" style="max-width: 150px;" placeholder="IngrediÃ«nt" name="ingedient" id="ingredient"><input type="number" style="max-width: 150px;" placeholder="Gram" name="gram" id="gram"><button type="submit" style="max-width: 150px;" name="voegtoe" id="voegtoe">voeg toe</button></div><div class="dagboek"><table class="table tabledagboek" id="table"></table></div>');
				$(".table").append('<tr><th class="ingredient">IngrediÃ«nt</th>	<th class="hoeveelheid">Hoeveelheid</th><th><select name="macro-optie"><option value="energie">Energie</option><option value="vet">Vet</option><option value="verzagigd-vet">Verzagigd vet</option>	<option value="eiwit">Eiwit</option><option value="koolhydraten">Koolhydraten</option><option value="vezels">Vezels</option><option value="eiwit">Eiwit</option></select><th></th></tr><tr><td class="ingredient"></td><td class="hoeveelheid"></td><td class="totaal" id="totaal">418</td><td class="removeingredient"></td></tr>');
				 console.log("Y");
				 $(data).each(function (index) {
					 $(".table").find('tr:last').prev().after('<tr><td class="ingredient">'+this.ingredientnaam+'</td><td class="hoeveelheid"><input class="gramtxt" type="text" value="'+this.hoeveelheid+'" name="gramtxt" id="gramtxt"></td><td class="subtotaal">'+this.calorieen+'</td><td class="removeingredient"><a href="#"> <i class="fa fa-times text-red"></i></a></td></tr>');
					});
			},
		});
}

//Ingredient zoeken
$(document).ready(function(){
var ingredienten = ["Appel", "Aardbei", "Aardappelen", "Banaan", "Bananen", "Banana"];
inputBox.onkeyup = function(evt) {
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
  $(".table").find('tr:last').prev().after('<tr><td class="ingredient">'+inputBox.value+'</td><td class="hoeveelheid"><input class="gramtxt" type="text" value="'+inputBoxGram.value+'" name="gramtxt" id="gramtxt"></td><td class="subtotaal">100</td><td class="removeingredient"><a href="#"><i class="fa fa-times text-red"></i></a></td></tr>');
  totals("totaal", 3);
  }
  else{alert('Foutieve waardes. Controleer');}
});
});

//Onchange hoeveelheid
$('#gramtext').bind('input', function() { 
	//console.log("Changed: " + $(this).val())
});