package voedseldagboek.dagboek.services;
import java.util.List;
import javax.annotation.security.RolesAllowed;
import javax.json.Json;
import javax.json.JsonArray;
import javax.json.JsonArrayBuilder;
import javax.json.JsonObjectBuilder;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import voedseldagboek.dagboek.domain.Dagboek;
import voedseldagboek.dagboek.domain.Ingredient;
import voedseldagboek.dagboek.domain.IngredientService;
import voedseldagboek.dagboek.domain.ServiceProvider;

@Path("/loadingredients")
public class IngredientResource {
	
	@GET
	@RolesAllowed("user")
	@Produces("application/json")
	public String getToday(
			@QueryParam("Q1") String gebruikersnaam, @QueryParam("Q2") String datum){
		IngredientService service = ServiceProvider.getIngredientService();
		JsonArray ingredientArray = buildJsonIngredientArray(service.getToday(gebruikersnaam, datum));
		return ingredientArray.toString();
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
