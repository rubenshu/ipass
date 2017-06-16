// Select current menu item
$(document).ready(
		function() {
			var url = window.location;
			$('.topmenu a').filter(function() {
				return this.href == url;
			}).removeClass('hover-white').removeClass('premoveing-large')
					.removeClass('hide-menu-item').removeClass('button')
					.removeClass('menu-item').addClass('white').addClass(
							'padding-large').addClass('button').addClass(
							'menu-item');
		});

// Date initialization for datapicker + h2 title
function setDate() {
	var now = new Date();
	var days = [ 'zondag', 'maandag', 'dinsdag', 'woensdag', 'donderdag',
			'vrijdag', 'zaterdag' ];
	var months = [ 'januari', 'februari', 'maart', 'april', 'mei', 'juni',
			'july', 'august', 'september', 'october', 'november', 'december' ];

	var newdate = " voor " + days[now.getDay()] + " " + now.getDate() + " "
			+ months[now.getMonth()] + " " + now.getFullYear();
	var datetext = ("0" + now.getDate()).slice(-2) + "-"
			+ ("0" + (now.getMonth() + 1)).slice(-2) + "-" + now.getFullYear();
	
	var selectedDatepicker;
	if (window.sessionStorage.getItem("selectedDatepicker") != null){
		selectedDatepicker = window.sessionStorage.getItem("selectedDatepicker");
		
	}
	else{
		selectedDatepicker = datetext;
	}
	
	document.getElementById("datepicker").value = selectedDatepicker;
	document.getElementById("add-date").innerHTML += " voor " + selectedDatepicker;
}

// Toggle mobile menu
function mobFunc() {
	var mob = document.getElementById("navMob");
	if (mob.className.indexOf("show") == -1) {
		mob.className += " show";
	} else {
		mob.className = mob.className.replace(" show", "");
	}
}

// Total macro's.
function totals(macro, i) {
	var total = 0.0;
	$('#table td:nth-child(' + i + '):not(:last)').each(function() {
		currentFloat = parseFloat($(this).text());
		total += currentFloat;
	});
	document.getElementById(macro).innerHTML = total.toFixed(1);
}