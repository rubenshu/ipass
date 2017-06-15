package voedseldagboek.dagboek.domain;

import java.util.Date;
import java.util.List;

import voedseldagboek.dagboek.persistence.*;

public class GebruikerService {
	private GebruikerdataDAO gebruikerdataDAO = new GebruikerdataDAO();
	private GebruikerloginDAO gebruikerloginDAO = new GebruikerloginDAO();

	public Gebruikerdata getGebruikerdata(String gebruikersnaam) {
		return gebruikerdataDAO.findByString(gebruikersnaam);
	}
	
	/*
	private IngredientDAO ingredientDAO = new IngredientDAO();
	private DagboekDAO dagboekDAO = new DagboekDAO();
	
	public List<Ingredient> getAll() {
		return ingredientDAO.findAll();
	}
	
	public Ingredient getIngredient(String ingredientnaam) {
		return ingredientDAO.findByString(ingredientnaam);
	}
	
	public List<Dagboek> getToday(String gebruikersnaam, String datum) {
		return dagboekDAO.findToday(gebruikersnaam, datum);
	}

	public void insertIngredient(int hoeveelheid, String datum, String ingredientnaam, String gebruikersnaam) {
		dagboekDAO.insertIngredient(hoeveelheid, datum, ingredientnaam, gebruikersnaam);
	}

	public void deleteIngredient(String ingredientnaam, String datum, String gebruikersnaam) {
		dagboekDAO.deleteIngredient(ingredientnaam, datum, gebruikersnaam);
	}

	public void updateIngredient(String ingredientnaam, String datum, String gebruikersnaam, int hoeveelheid) {
		dagboekDAO.updateIngredient(ingredientnaam, datum, gebruikersnaam, hoeveelheid);
	}*/
}
