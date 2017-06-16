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
import voedseldagboek.dagboek.domain.Dagboek;
import voedseldagboek.dagboek.domain.GebruikerService;
import voedseldagboek.dagboek.domain.Gebruikerdata;
import voedseldagboek.dagboek.domain.Ingredient;
import voedseldagboek.dagboek.domain.IngredientService;
import voedseldagboek.dagboek.domain.ServiceProvider;

@Path("/ingredients")
public class IngredientResource {

	@GET
	//@RolesAllowed("user")
	@Produces("application/json")
	public String getToday(@QueryParam("Q1") String gebruikersnaam, @QueryParam("Q2") String datum) {
		IngredientService service = ServiceProvider.getIngredientService();
		JsonArray ingredientArray = buildJsonIngredientArray(service.getToday(gebruikersnaam, datum));
		return ingredientArray.toString();
	}
	
	@GET
	@Path("/gebruiker")
	//@RolesAllowed("user")
	@Produces("application/json")
	public String getTodayGebruiker(@QueryParam("Q1") String gebruikersnaam, @QueryParam("Q2") String datum) {
		IngredientService service = ServiceProvider.getIngredientService();
		GebruikerService service2 = ServiceProvider.getGebruikerService();
		
		JsonArray ingredientGebruikerArray = buildJsonIngredientGebruikerArray(service.getToday(gebruikersnaam, datum), service2.getGebruikerdata(gebruikersnaam));
		
		return ingredientGebruikerArray.toString();
	}

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
	@Path("/insertingredient")
	@Produces("application/json")
	//@RolesAllowed("user")
	public void insertNewIngredient(@QueryParam("Q1") String ingredientnaam, @QueryParam("Q2") int calorieen, @QueryParam("Q3") double vet, @QueryParam("Q4") double verzadigd_vet, @QueryParam("Q5") double eiwit, @QueryParam("Q6") double koolhydraten, @QueryParam("Q7") double vezels, @QueryParam("Q8") double zout) {
		IngredientService service = ServiceProvider.getIngredientService();
		service.insertNewIngredient(ingredientnaam, calorieen, vet, verzadigd_vet, eiwit, koolhydraten, vezels, zout);
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
	
	private JsonArray buildJsonIngredientGebruikerArray(List<Dagboek> list, Gebruikerdata c) {
		JsonArrayBuilder jsonArrayBuilder = Json.createArrayBuilder();

			JsonObjectBuilder job = Json.createObjectBuilder();
			job.add("geslacht", c.getGeslacht());
			job.add("gewicht", c.getGewicht());
			job.add("leeftijd", c.getLeeftijd());
			job.add("lengte", c.getLengte());
			job.add("activiteit", c.getActiviteit());
			jsonArrayBuilder.add(job);
			
			for (Dagboek d : list) {
				Ingredient i = d.getIngredient();
				job.add("ingredientnaam", i.getIngredientnaam());
				job.add("hoeveelheid", d.getHoeveelheid());
				job.add("calorieen", i.getCalorieen());
				job.add("vet", i.getVet());
				job.add("verzadigd_vet", i.getVerzadigd_vet());
				job.add("eiwit", i.getEiwit());
				job.add("koolhydraten", i.getKoolhydraten());
				job.add("vezels", i.getVezels());
				job.add("zout", i.getZout());
				jsonArrayBuilder.add(job);
			}
		
		JsonArray d = jsonArrayBuilder.build();
		return d;
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
	
	private JsonArray buildJsonAllIngredientArray(List<Ingredient> list) {
		JsonArrayBuilder jsonArrayBuilder = Json.createArrayBuilder();

		for (Ingredient c : list) {
			JsonObjectBuilder job = Json.createObjectBuilder();
			job.add("ingredientnaam", c.getIngredientnaam());
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
	}
}
