//Inladen ingrediënten
$(document).ready(function () {
	loadMacro();
	
	$("#datepicker").datepicker({
		  onSelect: function(dateText) {
		    loadMacro();
		  }
		});
});

// Load ingredients from JSON test file
function loadMacro() {	
	var username = window.sessionStorage.getItem("huidigeGebruiker");
	var datum = document.getElementById("datepicker").value;
	var url = "restservices/ingredients/gebruiker?Q1=" + username + "&Q2=" + datum;
		$.ajax({
			url : url,
			method : "GET",
			async: false,
			beforeSend : function(xhr) {
				var token = window.sessionStorage.getItem("sessionToken");
				xhr.setRequestHeader('Authorization', 'Bearer ' + token);
			},
			success : function(data) {
				 var totalCal=0;
				 var totalVet=0;
				 var totalVv=0;
				 var totalEiwit=0;
				 var totalKh=0;
				 var totalVezels=0;
				 var totalZout=0;
				 var onderhoud=0;
				$(data).each(function (index) {
					if (index === 0){
	                    if (this.geslacht == "m"){
	                        onderhoud = (66 + (13.7 * this.gewicht) + (5 * (this.lengte*100)) - (6.8 * this.leeftijd)) * this.activiteit;
	                    }
	                    else if (this.geslacht == "v"){
	                        onderhoud = (655 + (9.6 * this.gewicht) + (1.8 * (this.lengte*100)) - (4.7 * this.leeftijd)) * this.activiteit;
	                    }
					}
						else if (index > 0){
							 totalCal += (this.hoeveelheid * this.calorieen) / 100;
							 totalVet += (this.hoeveelheid * this.vet) / 100;
							 totalVv += (this.hoeveelheid * this.verzadigd_vet) / 100;
							 totalEiwit += (this.hoeveelheid * this.eiwit) / 100;
							 totalKh += (this.hoeveelheid * this.koolhydraten) / 100;
							 totalVezels += (this.hoeveelheid * this.vezels) / 100;
							 totalZout += (this.hoeveelheid * this.zout) / 100;
						}
					});
				
				//LOGIC
				var minCal = (onderhoud - 200).toFixed(0);
				var maxCal = (onderhoud + 200).toFixed(0);
				totalCal = totalCal.toFixed(0);
				totalVet = totalVet.toFixed(1);
				totalVv = totalVv.toFixed(1);
				totalEiwit = totalEiwit.toFixed(1);
				totalKh = totalKh.toFixed(1);
				totalVezels = totalVezels.toFixed(1);
				totalZout = totalZout.toFixed(1);
				onderhoud = onderhoud.toFixed(1);
				kcalKh = totalKh * 4;
				kcalEiwit = totalEiwit * 4;
				kcalVet = totalVet * 10;
				kcalTotal = kcalKh + kcalEiwit + kcalVet;
				pKh = (kcalTotal / kcalKh).toFixed(0);
				pEiwit = (kcalTotal / kcalEiwit).toFixed(0);
				pVet = (kcalTotal / kcalVet).toFixed(0);
				var CalStr="";
				
				if (totalCal > minCal & totalCal < maxCal){
					CalStr += '<p class="macro" id="calorieen">Energie: '+totalCal+' kcal</p><p class="advies">De hoeveelheid energie die je uit je voeding haalt ligt tussen de richtlijn ('+minCal+'-'+maxCal+'kcal).';
				}
				else if (totalCal < minCal){
					CalStr += '<p class="macro" id="calorieen">Energie: '+totalCal+' kcal</p><p class="advies">De hoeveelheid energie die je uit je voeding haalt is minder dan de richtlijn ('+onderhoud+'kcal).';
				}
				else {
					CalStr += '<p class="macro" id="calorieen">Energie: '+totalCal+' kcal</p><p class="advies">De hoeveelheid energie die je uit je voeding haalt is meer dan de richtlijn ('+onderhoud+'kcal).';
				}
				
				CalStr += ' Deze richtlijn geldt voor mensen van jouw leeftijd, geslacht en leefstijl. Deze richtlijn zegt iets over je energiebehoefte, dus over hoeveel je op een dag zou moeten eten en drinken. Energiebehoefte is ook afhankelijk van je gewicht.</p>';
				document.getElementById('advies').innerHTML = CalStr;
				
				// VET
				if (pVet > 20 & pVet < 40){
					document.getElementById('advies').innerHTML += '<p class="macro" id="vet">Vet: '+totalVet+'g - '+pVet+'%</p><p class="advies">Je voeding bevat genoeg vet (tussen de 20-40%).';
				}
				if (pVet < 20){
					document.getElementById('advies').innerHTML += '<p class="macro" id="vet">Vet: '+totalVet+'g - '+pVet+'%</p><p class="advies">Je voeding bevat niet genoeg vet (minder dan 20%).';
				}
				else {
					document.getElementById('advies').innerHTML += '<p class="macro" id="vet">Vet: '+totalVet+'g - '+pVet+'%</p><p class="advies">Je voeding bevat te veel vet (meer dan 40%).';
				}
				document.getElementById('advies').innerHTML += ' Vetten geven je lichaam energie.</p>';
				
				
				
				
				
			},
		});
}
/*
function setAdviezen(){
	var cal = 1800;
	var onderhoud = 2200;
	if (onderhoud > 2000 && onderhoud < 2400){
		$(".advies").append('<li><a href="#" class="item">' + item + '</a></li>');
	}
	
}
*/