package voedseldagboek.dagboek.persistence;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import voedseldagboek.dagboek.domain.Ingredient;

// Extending base DAO for functionality
public class IngredientDAO extends BaseDAO {

	//The select method. This method is called when a return is needed.
	private List<Ingredient> selectIngredients(String query) {
		// New List to store values in
		List<Ingredient> results = new ArrayList<Ingredient>();
		
		//Make the connection to the DB
		try (Connection con = super.getConnection()) {
			Statement stmt = con.createStatement();
			//Query gets passed into the executeQuery
			ResultSet dbResultSet = stmt.executeQuery(query);
			
			//As long as there is a next result, save the results in a new Ingredient object and add it to the results
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
			//Catch any errors if the try statement fails
		} catch (SQLException sqle) {
			sqle.printStackTrace();
		}
		// Return the results
		return results;
	}
	
	//Select & return all
	public List<Ingredient> findAll() {
		return selectIngredients("SELECT ingredientnaam, calorieen, vet, verzadigd_vet, eiwit, koolhydraten, vezels, zout FROM ingredient");
	}
	
	//Select & return 1 Ingredient
	public Ingredient findByString(String ingredientNaam) {
		return selectIngredients("SELECT ingredientnaam, calorieen, vet, verzadigd_vet, eiwit, koolhydraten, vezels, zout FROM ingredient WHERE ingredientnaam = '"+ingredientNaam +"'").get(0);
	}

	//Insert a new ingredient
	public boolean insertNewIngredient(String ingredientnaam, int calorieen, double vet, double verzadigd_vet,
			double eiwit, double koolhydraten, double vezels, double zout) {
		boolean result = false;
			String query = "insert into ingredient(ingredientnaam, calorieen, vet, verzadigd_vet, eiwit, koolhydraten, vezels, zout) values('"+ingredientnaam+"','" + calorieen + "','" + vet + "','" + verzadigd_vet + "','" + eiwit + "','" + koolhydraten + "','" + vezels + "','" + zout + "')";
			
			try (Connection con = super.getConnection()) {
				Statement stmt = con.createStatement();
				if (stmt.executeUpdate(query) == 1) { // 1 row updated!
				result = true;
				}
				
			} catch (SQLException sqle) {
				sqle.printStackTrace();
		}
			return result;
	}

	//Update an existing ingredient
	public boolean updateExistingIngredient(String ingredientnaam, int calorieen, double vet, double verzadigd_vet,
			double eiwit, double koolhydraten, double vezels, double zout) {
		boolean result = false;
		String query = "UPDATE ingredient SET ingredientnaam = '"+ingredientnaam+"', calorieen = '" + calorieen + "', vet = '" + vet + "', verzadigd_vet = '" + verzadigd_vet + "', eiwit = '" + eiwit + "', koolhydraten = '" + koolhydraten + "', vezels = '" + vezels + "', zout = '" + zout + "' WHERE ingredientnaam = '"+ingredientnaam+"'";
						
				try (Connection con = super.getConnection()) {
			Statement stmt = con.createStatement();
			if (stmt.executeUpdate(query) == 1) { // 1 row updated!
				result = true;
			}
			
		} catch (SQLException sqle) {
			sqle.printStackTrace();
	}
				return result;
	}
}
