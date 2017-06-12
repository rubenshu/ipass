package voedseldagboek.dagboek.services;

import java.util.List;
import javax.json.Json;
import javax.json.JsonArray;
import javax.json.JsonArrayBuilder;
import javax.json.JsonObjectBuilder;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;

import voedseldagboek.dagboek.domain.Ingredient;
import voedseldagboek.dagboek.domain.IngredientService;
import voedseldagboek.dagboek.domain.ServiceProvider;

@Path("/ingredients")
public class IngredientResource {
	
	@GET
	@Produces("application/json")
	public String getIngredients() {
		IngredientService service = ServiceProvider.getIngredientService();
		JsonArray ingredientArray = buildJsonIngredientArray(service.getAllIngredients());
		
		return ingredientArray.toString();
	}
	

	private JsonArray buildJsonIngredientArray(List<Ingredient> ingredients) {
		JsonArrayBuilder jsonArrayBuilder = Json.createArrayBuilder();
		
		for (Ingredient c : ingredients) {
			JsonObjectBuilder job = Json.createObjectBuilder();
			job.add("ingredientnaam", c.getIngredientnaam());
			job.add("calorieen", c.getCalorieen());
			
			
			jsonArrayBuilder.add(job);
		}
		System.out.println(jsonArrayBuilder.build());
		return jsonArrayBuilder.build();
	}
}
