//Inladen ingrediënten
$(document).ready(function () {
	//loadAdviezen();
	
	$("#datepicker").datepicker({
		  onSelect: function(dateText) {
		    //loadAdviezen();
		  }
		});
});

function loadOnderhoud(getData) {  
    var username = window.sessionStorage.getItem("huidigeGebruiker");
    var url = "restservices/gebruiker?Q1=" + username;
        $.ajax({
            url : url,
            method : "GET",
            beforeSend : function(xhr) {
                var token = window.sessionStorage.getItem("sessionToken");
                xhr.setRequestHeader('Authorization', 'Bearer ' + token);
            },
            success : function(data) {
                var onderhoud;

                $(data).each(function (index) {
                    if (this.geslacht == "m"){
                        onderhoud = (66 + (13.7 * this.gewicht) + (5 * (this.lengte*100)) - (6.8 * this.leeftijd)) * this.activiteit;
                    }
                    else if (this.geslacht == "v"){
                        onderhoud = (655 + (9.6 * this.gewicht) + (1.8 * (this.lengte*100)) - (4.7 * this.leeftijd)) * this.activiteit;
                    }
                    });
                getData(onderhoud);
            },
        });
}

// Load ingredients from JSON test file
function loadMacro(getData) {	
	var username = window.sessionStorage.getItem("huidigeGebruiker");
	var datum = document.getElementById("datepicker").value;
	var url = "restservices/ingredients?Q1=" + username + "&Q2=" + datum;
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
				$(data).each(function (index) {
					 totalCal = (this.hoeveelheid * this.calorieen) / 100;
					 totalVet = (this.hoeveelheid * this.vet) / 100;
					 totalVv = (this.hoeveelheid * this.verzadigd_vet) / 100;
					 totalEiwit = (this.hoeveelheid * this.eiwit) / 100;
					 totalKh = (this.hoeveelheid * this.koolhydraten) / 100;
					 totalVezels = (this.hoeveelheid * this.vezels) / 100;
					 totalZout = (this.hoeveelheid * this.zout) / 100;
					});
				getData(totalCal);
			},
		});
		
}

function getData(data, dataa)
{
    var onderhoud = data;
    var macro = dataa;
    console.log(onderhoud, macro);
}
loadOnderhoud(getData);
loadMacro(getData);

function setAdviezen(){
	var cal = 1800;
	var onderhoud = 2200;
	
	if (onderhoud > 2000 && onderhoud < 2400){
		<p class="macro" id="energie">Energie: 2200 kcal</p>
		<p class="advies" "energie">De hoeveelheid energie die je uit je voeding
			haalt (774 kcal) is minder dan de richtlijn (2700kcal). Deze
			richtlijn geldt voor mensen van jouw leeftijd en geslacht die een
			niet zo actieve leefstijl hebben. Deze richtlijn zegt iets over je
			energiebehoefte, dus over hoeveel je op een dag zou moeten eten en
			drinken. Energiebehoefte is ook afhankelijk van je gewicht. Wil je
			de ontwikkeling van je gewicht in de gaten houden, vul je gewicht
			regelmatig in en kijk in de grafiek.</p>
	}
	
}

/*
function loadAdviezen(){
	var onderhoud = loadOnderhoud();
	var macro = [];
	macro = loadMacro();
	console.log(macro);
}*/