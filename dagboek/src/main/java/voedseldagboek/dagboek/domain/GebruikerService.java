package voedseldagboek.dagboek.domain;

import voedseldagboek.dagboek.persistence.GebruikerDAO;

public class GebruikerService {
	private GebruikerDAO gebruikerDAO = new GebruikerDAO();

	public Gebruiker getGebruiker(String gebruikersnaam) {
		return gebruikerDAO.findByString(gebruikersnaam);
	}

	public void insertNewGebruiker(String gebruikersnaam, String wachtwoord, String emailadres, String voornaam, String achternaam,
			String geboortedatum, double gewicht, int lengte, String geslacht, double activiteit) {
		gebruikerDAO.insertNewGebruiker(gebruikersnaam, wachtwoord, emailadres, voornaam, achternaam, geboortedatum, gewicht, lengte, geslacht, activiteit);
	}

	public void updateGebruiker(String voornaam, String achternaam, String emailadres, String geboortedatum,
			double gewicht, int lengte, String geslacht, double activiteit, String gebruikersnaam) {
		gebruikerDAO.updateGebruiker(voornaam, achternaam, emailadres, geboortedatum, gewicht, lengte, geslacht, activiteit, gebruikersnaam);
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
