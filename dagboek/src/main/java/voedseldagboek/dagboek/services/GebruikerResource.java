package voedseldagboek.dagboek.services;

import java.util.List;
import javax.annotation.security.RolesAllowed;
import javax.json.Json;
import javax.json.JsonArray;
import javax.json.JsonArrayBuilder;
import javax.json.JsonObjectBuilder;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import voedseldagboek.dagboek.domain.Gebruikerdata;
import voedseldagboek.dagboek.domain.Gebruikerlogin;
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
	
	
	private JsonArray buildJsonGebruikerArray(Gebruikerdata c) {
		JsonArrayBuilder jsonArrayBuilder = Json.createArrayBuilder();

			JsonObjectBuilder job = Json.createObjectBuilder();
			job.add("ingredientnaam", c.getGeslacht());
			job.add("calorieen", c.getGewicht());
			job.add("vet", c.getLeeftijd());
			job.add("verzadigd_vet", c.getLengte());

			jsonArrayBuilder.add(job);
		
		JsonArray d = jsonArrayBuilder.build();
		return d;
	}
/*
	@GET
	@Path("/all")
	//@RolesAllowed("user")
	@Produces("application/json")
	public String getToday() {
		IngredientService service = ServiceProvider.getIngredientService();
		JsonArray ingredientArray = buildJsonAllIngredientArray(service.getAll());
		return ingredientArray.toString();
	}
	
	@GET
	@Path("/insert")
	@Produces("application/json")
	//@RolesAllowed("user")
	public String insertIngredient(@QueryParam("Q1") int hoeveelheid, @QueryParam("Q2") String datum,@QueryParam("Q3") String ingredientnaam , @QueryParam("Q4") String gebruikersnaam) {
		IngredientService service = ServiceProvider.getIngredientService();
		service.insertIngredient(hoeveelheid, datum, ingredientnaam, gebruikersnaam);
		
		JsonArray ingredientArray = buildJsonSingleIngredientArray(service.getIngredient(ingredientnaam), hoeveelheid);
		return ingredientArray.toString();
	}
	
	@GET
	@Produces("text/html")
	@Path("/delete")
	public void deleteIngredient(@QueryParam("Q1") String ingredientnaam, @QueryParam("Q2") String datum, @QueryParam("Q3") String gebruikersnaam){
		IngredientService service = ServiceProvider.getIngredientService();
		service.deleteIngredient(ingredientnaam, datum, gebruikersnaam);
	}
	
	@GET
	@Produces("text/html")
	@Path("/update")
	public void updateIngredient(@QueryParam("Q1") String ingredientnaam, @QueryParam("Q2") String datum, @QueryParam("Q3") String gebruikersnaam, @QueryParam("Q4") int hoeveelheid){
		IngredientService service = ServiceProvider.getIngredientService();
		service.updateIngredient(ingredientnaam, datum, gebruikersnaam, hoeveelheid);
	}
	
	private JsonArray buildJsonSingleIngredientArray(Ingredient c, int hoeveelheid) {
		JsonArrayBuilder jsonArrayBuilder = Json.createArrayBuilder();
			JsonObjectBuilder job = Json.createObjectBuilder();
			job.add("ingredientnaam", c.getIngredientnaam());
			job.add("hoeveelheid", hoeveelheid);
			job.add("calorieen", c.getCalorieen());
			job.add("vet", c.getVet());
			job.add("verzadigd_vet", c.getVerzadigd_vet());
			job.add("eiwit", c.getEiwit());
			job.add("koolhydraten", c.getKoolhydraten());
			job.add("vezels", c.getVezels());
			job.add("zout", c.getZout());

			jsonArrayBuilder.add(job);
		
		JsonArray d = jsonArrayBuilder.build();
		return d;
	}

	private JsonArray buildJsonIngredientArray(List<Dagboek> list) {
		JsonArrayBuilder jsonArrayBuilder = Json.createArrayBuilder();

		for (Dagboek d : list) {
			Ingredient c = d.getIngredient();
			JsonObjectBuilder job = Json.createObjectBuilder();
			job.add("ingredientnaam", c.getIngredientnaam());
			job.add("hoeveelheid", d.getHoeveelheid());
			job.add("calorieen", c.getCalorieen());
			job.add("vet", c.getVet());
			job.add("verzadigd_vet", c.getVerzadigd_vet());
			job.add("eiwit", c.getEiwit());
			job.add("koolhydraten", c.getKoolhydraten());
			job.add("vezels", c.getVezels());
			job.add("zout", c.getZout());

			jsonArrayBuilder.add(job);
		}
		JsonArray c = jsonArrayBuilder.build();
		return c;
	}*/
}