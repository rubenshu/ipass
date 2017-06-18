//Inladen ingrediënten
$(document).ready(function () {
	time = new Date().getTime() / 1000;
	timestamp = window.sessionStorage.getItem('timestamp');
	console.log(time, timestamp, time-timestamp);
	if((time - timestamp) > 1200 || timestamp == null){
		window.location.replace("index.html");
	}
	else{
	loadIngredients();
	loadMenuItem();
	$("#datepicker").datepicker({
		  onSelect: function(dateText) {
		    loadIngredients();
		    window.sessionStorage.setItem("selectedDatepicker", dateText);
		    var selectedDatepicker = window.sessionStorage.getItem("selectedDatepicker");
		    document.getElementById("add-date").innerHTML = "Mijn adviezen voor " + selectedDatepicker;
		  }
		});
	}
});


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

// Load ingredients from JSON test file
function loadIngredients() {	
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
				if (data.length > 0){
					$(".overzicht").html('<table class="table tableoverzicht" id="table"><tr class="bodyheader"> <th class="ingredient" style="background-color:#c1c1c1;">Ingrediënt</th> <th class="hoeveelheid" style="background-color:#c1c1c1;""></th><th class="energie" style="background-color:#c1c1c1;">Energie (g)</th> <th class="vet" style="background-color:#c1c1c1;">Vet (g)</th> <th class="verzagigd-vet" style="background-color:#c1c1c1;">Verzadigd vet (g)</th><th class="eiwit" style="background-color:#c1c1c1;">Eiwit (g)</th><th class="koolhydraten" style="background-color:#c1c1c1;">Koolhydr. (g)</th><th class="vezels" style="background-color:#c1c1c1;">Vezels (g)</th><th class="zout" style="background-color:#c1c1c1;">Zout (g)</th>');
					 $(".table").append('</tr><tr class="totaal"><td class="ingredient">Totaal</td><td class="hoeveelheid"></td> <td class="energie" id="energie"></td><td class="vet" id="vet"></td><td class="verzagigd-vet" id="verzagigd-vet"></td><td class="eiwit" id="eiwit"></td><td class="koolhydraten" id="koolhydraten"></td><td class="vezels" id="vezels"></td><td class="zout" id="zout"></td></tr></table>');
					 $(data).each(function (index) {
						 var subcal = (this.hoeveelheid * this.calorieen) / 100;
						 var subvet = (this.hoeveelheid * this.vet) / 100;
						 var subvv = (this.hoeveelheid * this.verzadigd_vet) / 100;
						 var subeiwit = (this.hoeveelheid * this.eiwit) / 100;
						 var subkh = (this.hoeveelheid * this.koolhydraten) / 100;
						 var subvezels = (this.hoeveelheid * this.vezels) / 100;
						 var subzout = (this.hoeveelheid * this.zout) / 100;
						 $(".table").find('tr:last').prev().after('<tr><td class="ingredient">' + this.ingredientnaam + '</td><td class="hoeveelheid">' + this.hoeveelheid + '</td><td class="energie">' + subcal.toFixed(1) + '</td><td class="vet">' + subvet.toFixed(1) + '</td><td class="verzagigd-vet">' + subvv.toFixed(1) + '</td><td class="eiwit">' + subeiwit.toFixed(1) + '</td><td class="koolhydraten">' + subkh.toFixed(1) + '</td><td class="vezels">' + subvezels.toFixed(1) + '</td><td class="zout">' + subzout.toFixed(1) + '</td></tr>');
						});
					 loadTotals();
				}
				else{
					document.getElementById("overzicht").innerHTML = "Er is bij deze datum geen dagboek ingevuld.";
				}
				
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