package voedseldagboek.dagboek.domain;

import java.util.Date;
import java.util.List;

import voedseldagboek.dagboek.persistence.*;

public class IngredientService {
	private IngredientDAO ingredientDAO = new IngredientDAO();
	private DagboekDAO dagboekDAO = new DagboekDAO();
	
	public List<Ingredient> getAll() {
		return ingredientDAO.findAll();
	}
	
	public List<Dagboek> getToday(String gebruikersnaam, String datum) {
		return dagboekDAO.findToday(gebruikersnaam, datum);
	}
}
