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
				pVv = totalVv / totalVet;
				pEiwit = (kcalTotal / kcalEiwit).toFixed(0);
				pVet = (kcalTotal / kcalVet).toFixed(0);
				pVezels = (totalVezels / totalCal * 1000).toFixed(1);
				var CalStr="";
				var VetStr="";
				var VvStr="";
				var EiwitStr="";
				var KhStr="";
				var VezelsStr="";
				var ZoutStr="";
				
				//CALORIEEN
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
				if (pVet >= 25 & pVet <= 35){
					VetStr += '<p class="macro" id="vet">Vet: '+totalVet+'g - '+pVet+'%</p><p class="advies">Je voeding bevat genoeg vet (tussen de 25-35%).';
				}
				if (pVet < 25){
					VetStr += '<p class="macro" id="vet">Vet: '+totalVet+'g - '+pVet+'%</p><p class="advies">Je voeding bevat niet genoeg vet (minder dan 25%).';
				}
				else {
					VetStr += '<p class="macro" id="vet">Vet: '+totalVet+'g - '+pVet+'%</p><p class="advies">Je voeding bevat te veel vet (meer dan 35%).';
				}
				VetStr += "Vetten geven je lichaam energie.";
				document.getElementById('advies').innerHTML += VetStr;
				
				//Verzadigd Vet
				if (pVv >= 25 & pVv <= 50){
					VvStr += '<p class="macro" id="verzadigd_vet">Verzadigd vet: '+totalVv+'g - '+pVv+'%</p><p class="advies">Je voeding bevat genoeg verzadigd vet (tussen de 25-50%).';
				}
				else if (pVv < 25){
					VvStr += '<p class="macro" id="verzadigd_vet"Verzadigd vet: '+totalVv+'g - '+pVv+'%</p><p class="advies">Je voeding bevat niet genoeg verzadigd vet (minder dan 25%).';
				}
				else {
					VvStr += '<p class="macro" id="verzadigd_vet">Verzadigd vet: '+totalVv+'g - '+pVv+'%</p><p class="advies">Je voeding bevat te veel verzadigd vet (meer dan 50%).';
				}
				
				VvStr += ' Deze richtlijn geldt voor mensen van jouw leeftijd, geslacht en leefstijl. Deze richtlijn zegt iets over je energiebehoefte, dus over hoeveel je op een dag zou moeten eten en drinken. Energiebehoefte is ook afhankelijk van je gewicht.</p>';
				document.getElementById('advies').innerHTML += VvStr;
				
				//Eiwit
				if (pEiwit >= 30 & pEiwit <= 40){
					EitwitStr += '<p class="macro" id="eiwit">Eiwit: '+totalEiwit+'g</p><p class="advies">Je voeding bevat genoeg eiwit (tussen de 30-40%).';
				}
				else if (pEiwit < 30){
					EitwitStr += '<p class="macro" id="eiwit"Eiwit: '+totalEiwit+'g</p><p class="advies">Je voeding bevat niet genoeg eiwit (minder dan 30%).';
				}
				else {
					EitwitStr += '<p class="macro" id="eiwit">Eiwit: '+totalEiwit+'g</p><p class="advies">Je voeding bevat te veel eiwit (meer dan 40%).';
				}
				
				EitwitStr += ' Eiwit</p>';
				document.getElementById('advies').innerHTML += EitwitStr;
				
				//Koolhydraten
				if (pKh >= 30 & pKh <= 40){
					KhStr += '<p class="macro" id="koolhydraten">Koolhydraten: '+totalKh+'g</p><p class="advies">Je voeding bevat genoeg koolhydraten (tussen de 30-40%).';
				}
				else if (pKh < 30){
					KhStr += '<p class="macro" id="koolhydraten"Koolhydraten: '+totalKh+'g</p><p class="advies">Je voeding bevat niet genoeg koolhydraten (minder dan 30%).';
				}
				else {
					KhStr += '<p class="macro" id="koolhydraten">Koolhydraten: '+totalKh+'g</p><p class="advies">Je voeding bevat te veel koolhydraten (meer dan 40%).';
				}
				
				KhStr += ' Koolhydraten</p>';
				document.getElementById('advies').innerHTML += KhStr;
				
				//Vezels
				if (pVezels >= 9.6){
					VezelsStr += '<p class="macro" id="vezels">Vezels: '+totalVezels+'g - '+pVezels+'g/1000kcal</p><p class="advies">Je voeding bevat genoeg vezels (meer dan 9.6g per 1000kcal).';
				}
				else {
					VezelsStr += '<p class="macro" id="vezels">Vezels: '+totalVezels+'g - '+pVezels+'g/1000kcal</p><p class="advies">Je voeding bevat niet genoeg vezels (minder dan 9.g per 1000kcal).';
				}
				
				VezelsStr += ' Vezels</p>';
				document.getElementById('advies').innerHTML += VezelsStr;
				
				//Zout
				if (totalZout >= 3.8 & pKh <= 6){
					ZoutStr += '<p class="macro" id="zout">Zout: '+totalZout+'g</p><p class="advies">Je voeding bevat genoeg zout (tussen de 3.8-6g).';
				}
				else if (totalZout < 3.8){
					ZoutStr += '<p class="macro" id="zout"Zout: '+totalZout+'g</p><p class="advies">Je voeding bevar niet genoeg zout (minder dan 3.8g).';
				}
				else {
					ZoutStr += '<p class="macro" id="zout">Zout: '+totalZout+'g</p><p class="advies">Je voeding bevat te veel zout (meer dan 6g).';
				}
				
				ZoutStr += ' Zout</p>';
				document.getElementById('advies').innerHTML += ZoutStr;
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