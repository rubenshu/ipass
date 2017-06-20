package voedseldagboek.dagboek.domain;

public class ServiceProvider {
	//Create new isntance of service
	private static IngredientService ingredientService = new IngredientService();
	private static GebruikerService gebruikerService = new GebruikerService();
	
	//Make calls to the service
	public static IngredientService getIngredientService() {
		return ingredientService;
	}
	
	public static GebruikerService getGebruikerService(){
		return gebruikerService;
	}
}
