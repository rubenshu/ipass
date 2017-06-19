package voedseldagboek.dagboek.persistence;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import java.util.Date;
import voedseldagboek.dagboek.domain.Dagboek;
import voedseldagboek.dagboek.domain.Gebruiker;
import voedseldagboek.dagboek.domain.Ingredient;

//Extending base DAO for functionality
public class DagboekDAO extends BaseDAO {
	//DAO calls so it can call for the DAO functions
	private GebruikerDAO gebruikerDAO = new GebruikerDAO();
	private IngredientDAO ingredientDAO = new IngredientDAO();

	//The select method. This method is called when a return is needed.
	private List<Dagboek> selectDagboek(String query) {
		// New List to store values in
		List<Dagboek> results = new ArrayList<Dagboek>();

		//Make the connection to the DB
		try (Connection con = super.getConnection()) {
			Statement stmt = con.createStatement();
			//Query gets passed into the executeQuery
			ResultSet dbResultSet = stmt.executeQuery(query);

			//As long as there is a next result, save the results in a new Ingredient object and add it to the results
			while (dbResultSet.next()) {
				int dagboek_id = dbResultSet.getInt("dagboek_id");
				int hoeveelheid = dbResultSet.getInt("hoeveelheid");
				Date datum = dbResultSet.getDate("datum");

				String FK_ingredientnaam = dbResultSet.getString("FK_ingredientnaam");
				Ingredient ingredient = ingredientDAO.findByString(FK_ingredientnaam);

				String gebruikersnaam = dbResultSet.getString("FK_gebruikersnaam");
				Gebruiker gebruikerlogin = gebruikerDAO.findByString(gebruikersnaam);

				Dagboek newDagboek = new Dagboek(dagboek_id, hoeveelheid, datum);
				newDagboek.setIngredient(ingredient);
				newDagboek.setGebruiker(gebruikerlogin);

				results.add(newDagboek);
			}
			//Catch any errors if the try statement fails
		} catch (SQLException sqle) {
			sqle.printStackTrace();
		}
		// Return the results
		return results;
	}

	//Select & return all ingredients from the selected date and gebruiker
	public List<Dagboek> findToday(String huidigeGebruiker, String datum) {
		return selectDagboek(
				"SELECT dagboek_id, hoeveelheid, datum, FK_ingredientnaam, fk_gebruikersnaam FROM dagboek WHERE fk_gebruikersnaam = '"+ huidigeGebruiker + "' AND datum = '" + datum + "'");
	}

	//Select & return 1 dagboek_id
	public Dagboek findById(int dagboek_id) {
		return selectDagboek(
				"SELECT dagboek_id, hoeveelheid, datum, FK_ingredientnaam, fk_gebruikersnaam FROM dagboek WHERE dagboek_id = "+ dagboek_id).get(0);
	}

	//Insert a new ingredient into the dagboek from selected date&user
	public void insertIngredient(int hoeveelheid, String datum, String ingredientnaam, String gebruikersnaam) {
		String query = "select max(dagboek_id) from dagboek";
		
		try (Connection con = super.getConnection()) {
			Statement stmt = con.createStatement();
			ResultSet dbResultSet = stmt.executeQuery(query);
		    dbResultSet.next();
		    int maxId = dbResultSet.getInt(1) + 1;
			stmt.execute("insert into dagboek(dagboek_id, hoeveelheid, datum, FK_ingredientnaam, fk_gebruikersnaam) values('"+maxId+"','" + hoeveelheid + "','" + datum + "','" + ingredientnaam + "','" + gebruikersnaam + "')");
			
		} catch (SQLException sqle) {
			sqle.printStackTrace();
		}
	}

	// Delete ingredient from dagboek from selected user&datum
	public void deleteIngredient(String ingredientnaam, String datum, String gebruikersnaam) {
				String query = "DELETE FROM dagboek WHERE FK_ingredientnaam = '"+ingredientnaam+"' AND datum ='"+datum+"' AND fk_gebruikersnaam='"+gebruikersnaam+"'"; 
						
				try (Connection con = getConnection()) {
					
					Statement stmt = con.createStatement();
					stmt.executeUpdate(query);
							
				} catch (SQLException sqle) {
					sqle.printStackTrace();
				}
	}

	//Delete all dagboek entry's from specific ingredient & delete ingredient from ingredients
	public void deleteSoloIngredient(String ingredientnaam) {
		String query = "DELETE FROM dagboek WHERE FK_ingredientnaam = '"+ingredientnaam+"'";
		String query2 = "DELETE FROM ingredient WHERE ingredientnaam = '"+ingredientnaam+"'";
		
		try (Connection con = super.getConnection()) {
	Statement stmt = con.createStatement();
	stmt.execute(query);
	stmt.execute(query2);
	
} catch (SQLException sqle) {
	sqle.printStackTrace();
}
	}

}
