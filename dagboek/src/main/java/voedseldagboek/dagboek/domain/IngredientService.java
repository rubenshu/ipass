package voedseldagboek.dagboek.domain;

import java.util.List;

import voedseldagboek.dagboek.persistence.*;

public class IngredientService {
	private IngredientDAO ingredientDAO = new IngredientDAO();
	
	public List<Ingredient> getAllIngredients() {
		return ingredientDAO.findAll();
	}
}
