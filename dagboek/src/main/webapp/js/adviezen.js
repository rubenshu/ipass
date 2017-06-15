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
function loadMacro(getData) {	
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
				 var totalList = [];
				 
				$(data).each(function (index) {
                    if (this.geslacht == "m"){
                        onderhoud = (66 + (13.7 * this.gewicht) + (5 * (this.lengte*100)) - (6.8 * this.leeftijd)) * this.activiteit;
                    }
                    else if (this.geslacht == "v"){
                        onderhoud = (655 + (9.6 * this.gewicht) + (1.8 * (this.lengte*100)) - (4.7 * this.leeftijd)) * this.activiteit;
                    }
                    
					 totalCal = (this.hoeveelheid * this.calorieen) / 100;
					 totalVet = (this.hoeveelheid * this.vet) / 100;
					 totalVv = (this.hoeveelheid * this.verzadigd_vet) / 100;
					 totalEiwit = (this.hoeveelheid * this.eiwit) / 100;
					 totalKh = (this.hoeveelheid * this.koolhydraten) / 100;
					 totalVezels = (this.hoeveelheid * this.vezels) / 100;
					 totalZout = (this.hoeveelheid * this.zout) / 100;
					 totalList.push(totalCal, totalVet, totalVv, totalEiwit, totalKh, totalVezels, totalZout);
                    
                    console.log(onderhoud);
                    console.log(totalCal);
					
					});

			},
		});
		
}

function setAdviezen(){
	var cal = 1800;
	var onderhoud = 2200;
	if (onderhoud > 2000 && onderhoud < 2400){
		$(".advies").append('<li><a href="#" class="item">' + item + '</a></li>');
	}
	
}

/*
function loadAdviezen(){
	var onderhoud = loadOnderhoud();
	var macro = [];
	macro = loadMacro();
	console.log(macro);
}*/