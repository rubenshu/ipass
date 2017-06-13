package voedseldagboek.dagboek.persistence;

import java.sql.Connection;
import java.sql.Date;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import voedseldagboek.dagboek.domain.Dagboek;
import voedseldagboek.dagboek.domain.Gebruikerlogin;
import voedseldagboek.dagboek.domain.Ingredient;

public class DagboekDAO extends BaseDAO {
	private GebruikerloginDAO gebruikerloginDAO = new GebruikerloginDAO();
	private IngredientDAO ingredientDAO = new IngredientDAO();

	private List<Dagboek> selectIngredients(String query) {
		List<Dagboek> results = new ArrayList<Dagboek>();
		
		try (Connection con = super.getConnection()) {
			Statement stmt = con.createStatement();
			ResultSet dbResultSet = stmt.executeQuery(query);
			
			while (dbResultSet.next()) {
				int dagboek_id = dbResultSet.getInt("dagboek_id");
				int hoeveelheid = dbResultSet.getInt("hoeveelheid");
				Date datum = dbResultSet.getDate("datum");
				
				String ingredientnaam = dbResultSet.getString("FK_ingredientnaam");
				Ingredient ingredient = ingredientDAO.findByString(ingredientnaam);
				
				String gebruikersnaam = dbResultSet.getString("FK_gebruikersnaam");
				Gebruikerlogin gebruikerlogin = gebruikerloginDAO.findByString(gebruikersnaam);
				
				Dagboek newDagboek = new Dagboek(dagboek_id, hoeveelheid, datum);
				newDagboek.setIngredient(ingredient);
				newDagboek.setGebruiker(gebruikerlogin);
				
				results.add(newDagboek);
			}
		} catch (SQLException sqle) {
			sqle.printStackTrace();
		}
		
		return results;
	}
	
	//public List<Dagboek> findAll() {
	//	return selectIngredients("SELECT ingredientnaam, calorieen, vet, verzadigd_vet, eiwit, koolhydraten, vezels, zout FROM ingredient");
	//}
	
	//public List<Ingredient> findToday(huidigeGebruiker, geselecteerdeDatum) {
		//return selectIngredients("SELECT ingredientnaam, calorieen, vet, verzadigd_vet, eiwit, koolhydraten, vezels, zout FROM ingredient WHERE ingredientnaam = " +ingredientNaam).get(0);
	//}
	
	public Dagboek findById(int dagboek_id) {
		return selectIngredients("SELECT dagboek_id, hoeveelheid, datum, fk_ingredientnaam, fk_gebruikersnaam FROM dagboek WHERE dagboek_id = " +dagboek_id).get(0);
	}
}
