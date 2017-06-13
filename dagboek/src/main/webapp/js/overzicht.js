//Inladen ingrediënten
$(document).ready(function () {
	loadIngredients();
});

$( "#datepicker" ).click(function() {
	  loadIngredients();
	});

// Load ingredients from JSON test file
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
				$(".overzicht").html('<table class="table tableoverzicht" id="table"><tr class="bodyheader"> <th class="ingredient" style="background-color:#c1c1c1;">Ingrediënt</th> <th class="hoeveelheid" style="background-color:#c1c1c1;""></th><th class="energie" style="background-color:#c1c1c1;">Energie (g)</th> <th class="vet" style="background-color:#c1c1c1;">Vet (g)</th> <th class="verzagigd-vet" style="background-color:#c1c1c1;">Verzadigd vet (g)</th><th class="eiwit" style="background-color:#c1c1c1;">Eiwit (g)</th><th class="koolhydraten" style="background-color:#c1c1c1;">Koolhydr. (g)</th><th class="vezels" style="background-color:#c1c1c1;">Vezels (g)</th><th class="zout" style="background-color:#c1c1c1;">Zout (g)</th>');
				 $(".table").append('</tr><tr class="totaal"><td class="ingredient">Totaal</td><td class="hoeveelheid"></td> <td class="energie" id="energie"></td><td class="vet" id="vet"></td><td class="verzagigd-vet" id="verzagigd-vet"></td><td class="eiwit" id="eiwit"></td><td class="koolhydraten" id="koolhydraten"></td><td class="vezels" id="vezels"></td><td class="zout" id="zout"></td></tr></table>');
				 console.log("Y");
				 $(data).each(function (index) {
					 $(".table").find('tr:last').prev().after('<tr><td class="ingredient">' + this.ingredientnaam + '</td><td class="hoeveelheid">' + this.hoeveelheid + '</td><td class="energie">' + this.calorieen + '</td><td class="vet">' + this.vet + '</td><td class="verzagigd-vet">' + this.verzadigd_vet + '</td><td class="eiwit">' + this.eiwit + '</td><td class="koolhydraten">' + this.koolhydraten + '</td><td class="vezels">' + this.vezels + '</td><td class="zout">' + this.zout + '</td></tr>');
					});
			},
		});
}

// Update totaal
function loadTotals() {
	totals("energie", 3);
	totals("vet", 4);
	totals("verzagigd-vet", 5);
	totals("eiwit", 6);
	totals("koolhydraten", 7);
	totals("vezels", 8);
	totals("zout", 9);
}