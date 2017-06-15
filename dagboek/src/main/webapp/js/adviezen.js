//Inladen ingrediënten
$(document).ready(function () {
	loadAdviezen();
	
	$("#datepicker").datepicker({
		  onSelect: function(dateText) {
		    loadAdviezen();
		  }
		});
});

function loadOnderhoud() {	
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
						onderhoud = 66 + (13.7 * this.gewicht) + (5 * this.lengte) - (6.8 * this.leeftijd);
					}
					else if (this.geslacht == "v"){
						onderhoud = 655 + (9.6 * this.gewicht) + (1.8 * this.lengte) - (4.7 * this.leeftijd);
					}
					});
				
				return onderhoud;
			},
		});
		
}

// Load ingredients from JSON test file
function loadMacro() {	
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
				 var totalCal=0;
				 var totalVet=0;
				 var totalVv=0;
				 var totalEiwit=0;
				 var totalKh=0;
				 var totalVezels=0;
				 var totalZout=0;
				$(data).each(function (index) {
					totalCal += this.calorieen;
					totalVet += this.vet;
					totalVv += this.verzadigd_vet;
					totalEiwit += this.eiwit;
					totalKh += this.koolhydraten;
					totalVezels += this.vezels;
					totalZout += this.zout;
					});
				
				return totalCal, totalVet, totalVv, totalEiwit, totalKh, totalVezels, totalZout;
			},
		});
		
}

function loadAdviezen(){
	console.log(loadMacro());
	console.log(loadOnderhoud());
}