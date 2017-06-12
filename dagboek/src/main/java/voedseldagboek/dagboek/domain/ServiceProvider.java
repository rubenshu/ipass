package voedseldagboek.dagboek.domain;

public class ServiceProvider {
	private static IngredientService ingredientService = new IngredientService();
	
	public static IngredientService getIngredientService() {
		return ingredientService;
	}
}
