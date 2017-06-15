package voedseldagboek.dagboek.domain;

public class ServiceProvider {
	private static IngredientService ingredientService = new IngredientService();
	private static GebruikerService gebruikerService = new GebruikerService();
	
	public static IngredientService getIngredientService() {
		return ingredientService;
	}
	
	public static GebruikerService getGebruikerService(){
		return gebruikerService;
	}
}
