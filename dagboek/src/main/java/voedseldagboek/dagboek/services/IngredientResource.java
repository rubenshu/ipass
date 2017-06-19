package voedseldagboek.dagboek.services;

import java.util.List;

import javax.annotation.security.RolesAllowed;
//import javax.annotation.security.RolesAllowed;
import javax.json.Json;
import javax.json.JsonArray;
import javax.json.JsonArrayBuilder;
import javax.json.JsonObjectBuilder;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import voedseldagboek.dagboek.domain.Dagboek;
import voedseldagboek.dagboek.domain.Gebruiker;
import voedseldagboek.dagboek.domain.GebruikerService;
import voedseldagboek.dagboek.domain.Ingredient;
import voedseldagboek.dagboek.domain.IngredientService;
import voedseldagboek.dagboek.domain.ServiceProvider;

@Path("/ingredients")
public class IngredientResource {

	//Return ingredients of selected day & hoeveelheid of ingredient
	@GET
	@RolesAllowed({"user","admin"})
	@Produces("application/json")
	public String getTodayAmount(@QueryParam("Q1") String gebruikersnaam, @QueryParam("Q2") String datum) {
		IngredientService service = ServiceProvider.getIngredientService();
		JsonArray ingredientArray = buildJsonIngredientArray(service.getToday(gebruikersnaam, datum));
		return ingredientArray.toString();
	}
	
	//Return single ingredient values
	@GET
	@Path("/ingredient")
	@RolesAllowed("admin")
	@Produces("application/json")
	public String getIngredient(@QueryParam("Q1") String ingredientnaam) {
		IngredientService service = ServiceProvider.getIngredientService();
		JsonArray ingredientArray = buildJsonOnlyIngredientArray(service.getIngredient(ingredientnaam));
		return ingredientArray.toString();
	}
	
	//Return gebruiker & all ingredients of selected date
	@GET
	@Path("/gebruiker")
	@RolesAllowed({"user","admin"})
	@Produces("application/json")
	public String getTodayGebruiker(@QueryParam("Q1") String gebruikersnaam, @QueryParam("Q2") String datum) {
		IngredientService service = ServiceProvider.getIngredientService();
		GebruikerService service2 = ServiceProvider.getGebruikerService();
		
		JsonArray ingredientGebruikerArray = buildJsonIngredientGebruikerArray(service.getToday(gebruikersnaam, datum), service2.getGebruiker(gebruikersnaam));
		
		return ingredientGebruikerArray.toString();
	}

	//Return all ingredients
	@GET
	@Path("/all")
	@RolesAllowed({"user","admin"})
	@Produces("application/json")
	public String getAll() {
		IngredientService service = ServiceProvider.getIngredientService();
		JsonArray ingredientArray = buildJsonAllIngredientArray(service.getAll());
		return ingredientArray.toString();
	}
	
	//Insert new dagboek entry & return ingredient+amount
	@GET
	@Path("/insert")
	@Produces("application/json")
	@RolesAllowed({"user","admin"})
	public String insertIngredient(@QueryParam("Q1") int hoeveelheid, @QueryParam("Q2") String datum,@QueryParam("Q3") String ingredientnaam , @QueryParam("Q4") String gebruikersnaam) {
		IngredientService service = ServiceProvider.getIngredientService();
		service.insertIngredient(hoeveelheid, datum, ingredientnaam, gebruikersnaam);
		
		JsonArray ingredientArray = buildJsonSingleIngredientArray(service.getIngredient(ingredientnaam), hoeveelheid);
		return ingredientArray.toString();
	}
	
	//Insert new ingredient
	@GET
	@Path("/insertingredient")
	@RolesAllowed({"user","admin"})
	public boolean insertNewIngredient(@QueryParam("Q1") String ingredientnaam, @QueryParam("Q2") int calorieen, @QueryParam("Q3") double vet, @QueryParam("Q4") double verzadigd_vet, @QueryParam("Q5") double eiwit, @QueryParam("Q6") double koolhydraten, @QueryParam("Q7") double vezels, @QueryParam("Q8") double zout) {
		IngredientService service = ServiceProvider.getIngredientService();
		return service.insertNewIngredient(ingredientnaam, calorieen, vet, verzadigd_vet, eiwit, koolhydraten, vezels, zout);
	}
	
	//delete ingredient from dagboek
	@GET
	@Path("/delete")
	@RolesAllowed({"user","admin"})
	public boolean deleteIngredient(@QueryParam("Q1") String ingredientnaam, @QueryParam("Q2") String datum, @QueryParam("Q3") String gebruikersnaam){
		IngredientService service = ServiceProvider.getIngredientService();
		return service.deleteIngredient(ingredientnaam, datum, gebruikersnaam);
	}
	
	//Update ingredient values
	@GET
	@Path("/updateingredient")
	@RolesAllowed("admin")
	public boolean updateExistingIngredient(@QueryParam("Q1") String ingredientnaam, @QueryParam("Q2") int calorieen, @QueryParam("Q3") double vet, @QueryParam("Q4") double verzadigd_vet, @QueryParam("Q5") double eiwit, @QueryParam("Q6") double koolhydraten, @QueryParam("Q7") double vezels, @QueryParam("Q8") double zout) {
		IngredientService service = ServiceProvider.getIngredientService();
		return service.updateExistingIngredient(ingredientnaam, calorieen, vet, verzadigd_vet, eiwit, koolhydraten, vezels, zout);
	}
	
	//Delete ingredient entry
	@GET
	@Path("/deleteingredient")
	@RolesAllowed("admin")
	public boolean deleteIngredient(@QueryParam("Q1") String ingredientnaam) {
		IngredientService service = ServiceProvider.getIngredientService();
		return service.deleteIngedient(ingredientnaam);
	}
	
	// JsonArray builders: takes the return from called function & returns the processed values needed
	private JsonArray buildJsonIngredientGebruikerArray(List<Dagboek> list, Gebruiker c) {
		JsonArrayBuilder jsonArrayBuilder = Json.createArrayBuilder();

			JsonObjectBuilder job = Json.createObjectBuilder();
			job.add("geslacht", c.getGeslacht());
			job.add("gewicht", c.getGewicht());
			job.add("geboortedatum", c.getGeboortedatum());
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
	
	private JsonArray buildJsonOnlyIngredientArray(Ingredient c) {
		JsonArrayBuilder jsonArrayBuilder = Json.createArrayBuilder();
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
		
		JsonArray d = jsonArrayBuilder.build();
		return d;
	}
}
