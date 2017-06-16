package voedseldagboek.dagboek.services;

import javax.json.Json;
import javax.json.JsonArray;
import javax.json.JsonArrayBuilder;
import javax.json.JsonObjectBuilder;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import voedseldagboek.dagboek.domain.Gebruiker;
import voedseldagboek.dagboek.domain.GebruikerService;
import voedseldagboek.dagboek.domain.ServiceProvider;

@Path("/gebruiker")
public class GebruikerResource {

	@GET
	//@RolesAllowed("user")
	@Produces("application/json")
	public String getToday(@QueryParam("Q1") String gebruikersnaam) {
		GebruikerService service = ServiceProvider.getGebruikerService();
		JsonArray gebruikerArray = buildJsonGebruikerArray(service.getGebruikerdata(gebruikersnaam));
		return gebruikerArray.toString();
	}
	
	@GET
	@Path("/insertgebruiker")
	@Produces("application/json")
	//@RolesAllowed("user")
	public void insertNewIngredient(@QueryParam("Q1") String gebruikersnaam, @QueryParam("Q2") String wachtwoord, @QueryParam("Q3") String emailadres, @QueryParam("Q4") String voornaam, @QueryParam("Q5") String achternaam, @QueryParam("Q6") String geboortedatum, @QueryParam("Q7") double gewicht, @QueryParam("Q8") int lengte, @QueryParam("Q9") String geslacht, @QueryParam("Q10") double activiteit) {
		GebruikerService service = ServiceProvider.getGebruikerService();
		service.insertNewGebruiker(gebruikersnaam, wachtwoord, emailadres, voornaam, achternaam, geboortedatum, gewicht, lengte, geslacht, activiteit);
	}
	
	
	private JsonArray buildJsonGebruikerArray(Gebruiker c) {
		JsonArrayBuilder jsonArrayBuilder = Json.createArrayBuilder();

			JsonObjectBuilder job = Json.createObjectBuilder();
			job.add("geslacht", c.getGeslacht());
			job.add("gewicht", c.getGewicht());
			job.add("geboortedatum", c.getGeboortedatum());
			job.add("lengte", c.getLengte());
			job.add("activiteit", c.getActiviteit());

			jsonArrayBuilder.add(job);
		
		JsonArray d = jsonArrayBuilder.build();
		return d;
	}
}
