$(document).ready(function(){
// Onclick datapicker
         $(function() {
		 $.datepicker.setDefaults( $.datepicker.regional[ "nl" ] );
            $( "#datepicker" ).datepicker({
			dateFormat: "dd-mm-yy",
               showWeek:true,
               showAnim: "slide"
            });
         });
});