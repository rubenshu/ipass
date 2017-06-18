//Inladen ingrediënten
$(document).ready(function () {
	time = new Date().getTime() / 1000;
	timestamp = window.sessionStorage.getItem('timestamp');
	console.log(time, timestamp, time-timestamp);
	if((time - timestamp) > 1200 || timestamp == null){
		window.location.replace("index.html");
	}
	else{
	loadMacro();
	
	$("#datepicker").datepicker({
		  onSelect: function(dateText) {
		    loadMacro();
		    window.sessionStorage.setItem("selectedDatepicker", dateText);
		    var selectedDatepicker = window.sessionStorage.getItem("selectedDatepicker");
		    document.getElementById("add-date").innerHTML = "Mijn adviezen voor " + selectedDatepicker;
		  }
		});
	}
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
				console.log(data);
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
						value = this.geboortedatum;
						today = new Date();
						dob = new Date(value.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"));
						leeftijd = today.getFullYear() - dob.getFullYear();
					    
	                    if (this.geslacht == "m"){
	                        onderhoud = (66 + (13.7 * this.gewicht) + (5 * this.lengte) - (6.8 * leeftijd)) * this.activiteit;
	                    }
	                    else if (this.geslacht == "v"){
	                        onderhoud = (655 + (9.6 * this.gewicht) + (1.8 * this.lengte) - (4.7 * leeftijd)) * this.activiteit;
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
				// If there's info for today.
				if (totalCal > 0){
				//LOGIC
				var minCal = onderhoud - 200;
				var maxCal = onderhoud + 200;
				kcalKh = totalKh * 4;
				kcalEiwit = totalEiwit * 4;
				kcalVet = totalVet * 10;
				pVet = kcalVet / totalCal*100;
				pKh = kcalKh / totalCal *100;
				pVv = totalVv / totalVet*100;
				pEiwit = kcalEiwit / totalCal *100;
				pVezels = totalVezels / totalCal * 1000;
				var CalStr="";
				var VetStr="";
				var VvStr="";
				var EiwitStr="";
				var KhStr="";
				var VezelsStr="";
				var ZoutStr="";				
				
				//CALORIEEN
				if (totalCal >= minCal & totalCal <= maxCal){
					CalStr += '<p class="macro" id="calorieen">Energie: '+totalCal.toFixed(0)+' kcal</p><p class="advies">De hoeveelheid energie die je uit je voeding haalt ligt tussen de richtlijn ('+minCal.toFixed(0)+'-'+maxCal.toFixed(0)+'kcal).';
				}
				else if (totalCal < minCal){
					CalStr += '<p class="macro" id="calorieen">Energie: '+totalCal.toFixed(0)+' kcal</p><p class="advies">De hoeveelheid energie die je uit je voeding haalt is ('+(onderhoud-totalCal).toFixed(0)+'kcal) minder dan de richtlijn ('+onderhoud.toFixed(0)+'kcal).';
				}
				else if(totalCal > maxCal){
					CalStr += '<p class="macro" id="calorieen">Energie: '+totalCal.toFixed(0)+' kcal</p><p class="advies">De hoeveelheid energie die je uit je voeding haalt is ('+(totalCal-onderhoud).toFixed(0)+'kcal) meer dan de richtlijn ('+onderhoud.toFixed(0)+'kcal).';
				}
				CalStr += ' Deze richtlijn geldt voor mensen van jouw leeftijd, geslacht en leefstijl. Deze richtlijn zegt iets over je energiebehoefte, dus over hoeveel je op een dag zou moeten eten en drinken. Energiebehoefte is ook afhankelijk van je gewicht. Eet je meer, dan kom je aan in gewicht. Eet je minder, dan val je af.</p>';
				
				// VET
				if (pVet >= 25 & pVet <= 35){
					VetStr += '<p class="macro" id="vet">Vet: '+totalVet.toFixed(1)+'g - '+pVet.toFixed(1)+'%</p><p class="advies">Je voeding bevat genoeg vet (tussen de 25-35%).';
				}
				else if (pVet < 25){
					VetStr += '<p class="macro" id="vet">Vet: '+totalVet.toFixed(1)+'g - '+pVet.toFixed(1)+'%</p><p class="advies">Je voeding bevat niet genoeg vet (minder dan 25%).';
				}
				else {
					VetStr += '<p class="macro" id="vet">Vet: '+totalVet.toFixed(1)+'g - '+pVet.toFixed(1)+'%</p><p class="advies">Je voeding bevat te veel vet (meer dan 35%).';
				}
				VetStr += "Vetten geven je lichaam energie. Ook wordt het gebruikt als bouwstof voor je lichaamscellen. Gezonde vetten dragen bij aan een verlaagde kans op  hart- en vaatziekten. Per gram levert vet circa 10 kcal. Gezonde keuzes voor vet zijn: (vette) vis, eieren, noten, avocado. Minder gezond zijn: snoep, fastfood.";
				
				//Verzadigd Vet
				if (pVv >= 25 & pVv <= 50){
					VvStr += '<p class="macro" id="verzadigd_vet">Verzadigd vet: '+totalVv.toFixed(1)+'g - '+pVv.toFixed(1)+'%</p><p class="advies">Je voeding bevat genoeg verzadigd vet (tussen de 25-50%).';
				}
				else if (pVv < 25){
					VvStr += '<p class="macro" id="verzadigd_vet">Verzadigd vet: '+totalVv.toFixed(1)+'g - '+pVv.toFixed(1)+'%</p><p class="advies">Je voeding bevat niet genoeg verzadigd vet (minder dan 25%).';
				}
				else {
					VvStr += '<p class="macro" id="verzadigd_vet">Verzadigd vet: '+totalVv.toFixed(1)+'g - '+pVv.toFixed(1)+'%</p><p class="advies">Je voeding bevat te veel verzadigd vet (meer dan 50%).';
				}
				VvStr += ' Veel verzadigde vetten in de supermarkt zijn ongezond. Deze dragen bij aan een verhoogd LDL-cholesterol in het bloed, eet hier dus niet te veel van. Dit draagt bij aan een verhoogde kans op hart- en vaatziekten. Maar er zijn ook gezonde onverzadigde vetten, deze helpen de functies van je lichaamscellen.</p>';
				
				//Eiwit
				if (pEiwit >= 30 & pEiwit <= 40){
					EiwitStr += '<p class="macro" id="eiwit">Eiwit: '+totalEiwit.toFixed(1)+'g - '+pEiwit.toFixed(1)+'%</p><p class="advies">Je voeding bevat genoeg eiwit (tussen de 30-40%).';
				}
				else if (pEiwit < 30){
					EiwitStr += '<p class="macro" id="eiwit">Eiwit: '+totalEiwit.toFixed(1)+'g - '+pEiwit.toFixed(1)+'%</p><p class="advies">Je voeding bevat niet genoeg eiwit (minder dan 30%).';
				}
				else {
					EiwitStr += '<p class="macro" id="eiwit">Eiwit: '+totalEiwit.toFixed(1)+'g - '+pEiwit.toFixed(1)+'%</p><p class="advies">Je voeding bevat te veel eiwit (meer dan 40%).';
				}
				EiwitStr += "Eiwitten zijn belangrijk voor de opbouw en het in stand houden van lichaamscellen. Ook voor je spieren is een goede hoeveelheid eiwit op een dag zeer belangrijk. Per gram levert eiwit circa 4 kcal."
				
				//Koolhydraten
				if (pKh >= 30 & pKh <= 40){
					KhStr += '<p class="macro" id="koolhydraten">Koolhydraten: '+totalKh.toFixed(1)+'g - '+pKh.toFixed(1)+'%</p><p class="advies">Je voeding bevat genoeg koolhydraten (tussen de 30-40%).';
				}
				else if (pKh < 30){
					KhStr += '<p class="macro" id="koolhydraten">Koolhydraten: '+totalKh.toFixed(1)+'g - '+pKh.toFixed(1)+'%</p><p class="advies">Je voeding bevat niet genoeg koolhydraten (minder dan 30%).';
				}
				else {
					KhStr += '<p class="macro" id="koolhydraten">Koolhydraten: '+totalKh.toFixed(1)+'g - '+pKh.toFixed(1)+'%</p><p class="advies">Je voeding bevat te veel koolhydraten (meer dan 40%).';
				}
				KhStr += "Koolhydraten geven je lichaam energie. Per gram levert koolhydraten circa 4kcal. Gezonde keuzes voor koolhydraten zijn o.a.: volkorenproducten, meergranenproducten, fruit, aardappelen. Minder gezond zijn: gebak, koek, snoep, frisdrank."
				
				//Vezels
				if (pVezels >= 9.6){
					VezelsStr += '<p class="macro" id="vezels">Vezels: '+totalVezels.toFixed(1)+'g - '+pVezels.toFixed(1)+'g/1000kcal</p><p class="advies">Je voeding bevat genoeg vezels (meer dan 9.6g per 1000kcal).';
				}
				else {
					VezelsStr += '<p class="macro" id="vezels">Vezels: '+totalVezels.toFixed(1)+'g - '+pVezels.toFixed(1)+'g/1000kcal</p><p class="advies">Je voeding bevat niet genoeg vezels (minder dan 9.g per 1000kcal).';
				}
				VezelsStr += "Voor een goede darmwerking zijn vezels belangrijk. Ze geven je ook een vol gevoel. Vezels zitten o.a. in meergranen producten, volkoren producten, aardappelen, fruit, groente en noten."
				
				
				//Zout
				if (totalZout >= 3.8 & pKh <= 6){
					ZoutStr += '<p class="macro" id="zout">Zout: '+totalZout.toFixed(1)+'g</p><p class="advies">Je voeding bevat genoeg zout (tussen de 3.8-6g).';
				}
				else if (totalZout < 3.8){
					ZoutStr += '<p class="macro" id="zout">Zout: '+totalZout.toFixed(1)+'g</p><p class="advies">Je voeding bevar niet genoeg zout (minder dan 3.8g).';
				}
				else {
					ZoutStr += '<p class="macro" id="zout">Zout: '+totalZout.toFixed(1)+'g</p><p class="advies">Je voeding bevat te veel zout (meer dan 6g).';
				}
				ZoutStr += "Keukenzout zit tegenwoordig in bijna alle producten. Het is belangrijk (en soms moeilijk) om hier op een dag niet te veel van binnen te krijgen. De fabrikant voegt vaak zout toe voor smaak of houdbaarheid. Daarnaast wordt het door onszelf ook regelmatig toegevoegd aan het eten."
				
				printStr = CalStr + VetStr + VvStr + EiwitStr + KhStr + VezelsStr + ZoutStr;
				document.getElementById('advies').innerHTML = printStr;
				
				}
				else{document.getElementById('advies').innerHTML = "Er is bij deze datum geen dagboek ingevuld.";}
			},
		});
}