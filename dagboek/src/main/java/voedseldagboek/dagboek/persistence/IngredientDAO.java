package voedseldagboek.dagboek.persistence;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import voedseldagboek.dagboek.domain.Ingredient;

public class IngredientDAO extends BaseDAO {

	private List<Ingredient> selectIngredients(String query) {
		List<Ingredient> results = new ArrayList<Ingredient>();
		
		try (Connection con = super.getConnection()) {
			Statement stmt = con.createStatement();
			ResultSet dbResultSet = stmt.executeQuery(query);
			
			while (dbResultSet.next()) {
				String ingredientnaam = dbResultSet.getString("ingredientnaam");
				int calorieen = dbResultSet.getInt("calorieen");
				double vet = dbResultSet.getDouble("vet");
				double verzadigd_vet = dbResultSet.getDouble("verzadigd_vet");
				double eiwit = dbResultSet.getDouble("eiwit");
				double koolhydraten = dbResultSet.getDouble("koolhydraten");
				double vezels = dbResultSet.getDouble("vezels");
				double zout = dbResultSet.getDouble("zout");
				Ingredient ing = new Ingredient(ingredientnaam, calorieen, vet, verzadigd_vet, eiwit, koolhydraten, vezels, zout);
				results.add(ing);
			}
		} catch (SQLException sqle) {
			sqle.printStackTrace();
		}
		
		return results;
	}
	
	public List<Ingredient> findAll() {
		return selectIngredients("SELECT ingredientnaam, calorieen, vet, verzadigd_vet, eiwit, koolhydraten, vezels, zout FROM ingredient");
	}
	
	//public List<Ingredient> findToday(huidigeGebruiker, geselecteerdeDatum) {
		//return selectIngredients("SELECT ingredientnaam, calorieen, vet, verzadigd_vet, eiwit, koolhydraten, vezels, zout FROM ingredient WHERE ingredientnaam = " +ingredientNaam).get(0);
	//}
	
	public Ingredient findByString(String ingredientNaam) {
		return selectIngredients("SELECT ingredientnaam, calorieen, vet, verzadigd_vet, eiwit, koolhydraten, vezels, zout FROM ingredient WHERE ingredientnaam = '"+ingredientNaam +"'").get(0);
	}
}
