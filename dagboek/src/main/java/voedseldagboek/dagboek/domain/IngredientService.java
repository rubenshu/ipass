package voedseldagboek.dagboek.domain;

import java.util.List;

import voedseldagboek.dagboek.persistence.*;

public class IngredientService {
	// New DAO so function calling is available
	private IngredientDAO ingredientDAO = new IngredientDAO();
	private DagboekDAO dagboekDAO = new DagboekDAO();
	
	//From the resource the call gets here & it's passed to the DAO
	public List<Ingredient> getAll() {return ingredientDAO.findAll();}
	public Ingredient getIngredient(String ingredientnaam) {return ingredientDAO.findByString(ingredientnaam);}
	public List<Dagboek> getToday(String gebruikersnaam, String datum) {return dagboekDAO.findToday(gebruikersnaam, datum);}
	public void insertIngredient(int hoeveelheid, String datum, String ingredientnaam, String gebruikersnaam) {dagboekDAO.insertIngredient(hoeveelheid, datum, ingredientnaam, gebruikersnaam);}
	public boolean deleteIngredient(String ingredientnaam, String datum, String gebruikersnaam) {return dagboekDAO.deleteIngredient(ingredientnaam, datum, gebruikersnaam);}
	public void insertNewIngredient(String ingredientnaam, int calorieen, double vet, double verzadigd_vet, double eiwit, double koolhydraten, double vezels, double zout) {ingredientDAO.insertNewIngredient(ingredientnaam, calorieen, vet, verzadigd_vet, eiwit, koolhydraten, vezels, zout);}
	public void updateExistingIngredient(String ingredientnaam, int calorieen, double vet, double verzadigd_vet,double eiwit, double koolhydraten, double vezels, double zout) {ingredientDAO.updateExistingIngredient(ingredientnaam, calorieen, vet, verzadigd_vet, eiwit, koolhydraten, vezels, zout);}
	public void deleteIngedient(String ingredientnaam) {dagboekDAO.deleteSoloIngredient(ingredientnaam);}
}
