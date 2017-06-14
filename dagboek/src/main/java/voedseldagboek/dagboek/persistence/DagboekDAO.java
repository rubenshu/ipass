package voedseldagboek.dagboek.persistence;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import java.util.Date;

import voedseldagboek.dagboek.domain.Dagboek;
import voedseldagboek.dagboek.domain.Gebruikerlogin;
import voedseldagboek.dagboek.domain.Ingredient;

public class DagboekDAO extends BaseDAO {
	private GebruikerloginDAO gebruikerloginDAO = new GebruikerloginDAO();
	private IngredientDAO ingredientDAO = new IngredientDAO();

	private List<Dagboek> selectDagboek(String query) {
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

	// public List<Dagboek> findAll() {
	// return selectIngredients("SELECT ingredientnaam, calorieen, vet,
	// verzadigd_vet, eiwit, koolhydraten, vezels, zout FROM ingredient");
	// }

	public List<Dagboek> findToday(String huidigeGebruiker, String datum) {
		return selectDagboek(
				"SELECT dagboek_id, hoeveelheid, datum, fk_ingredientnaam, fk_gebruikersnaam FROM dagboek WHERE fk_gebruikersnaam = '"+ huidigeGebruiker + "' AND datum = '" + datum + "'");
	}

	public Dagboek findById(int dagboek_id) {
		return selectDagboek(
				"SELECT dagboek_id, hoeveelheid, datum, fk_ingredientnaam, fk_gebruikersnaam FROM dagboek WHERE dagboek_id = "+ dagboek_id).get(0);
	}

	public void insertIngredient(int hoeveelheid, String datum, String ingredientnaam, String gebruikersnaam) {
		String query = "select max(dagboek_id) from dagboek";
		
		try (Connection con = super.getConnection()) {
			Statement stmt = con.createStatement();
			ResultSet dbResultSet = stmt.executeQuery(query);
		    dbResultSet.next();
		    int maxId = dbResultSet.getInt(1) + 1;
			stmt.executeQuery("insert into dagboek(dagboek_id, hoeveelheid, datum, fk_ingredientnaam, fk_gebruikersnaam) values('"+maxId+"','" + hoeveelheid + "','" + datum + "','" + ingredientnaam + "','" + gebruikersnaam + "')");
			
		} catch (SQLException sqle) {
			sqle.printStackTrace();
		}
	}

	public void deleteIngredient(String ingredientnaam, String datum, String gebruikersnaam) {
				String query = "DELETE FROM dagboek WHERE fk_ingredientnaam = '"+ingredientnaam+"' AND datum ='"+datum+"' AND fk_gebruikersnaam='"+gebruikersnaam+"'"; 
						
				try (Connection con = getConnection()) {
					
					Statement stmt = con.createStatement();
					stmt.executeUpdate(query);
							
				} catch (SQLException sqle) {
					sqle.printStackTrace();
				}
	}
	
	public void updateIngredient(String ingredientnaam, String datum, String gebruikersnaam, int hoeveelheid) {
		String query = "UPDATE dagboek SET hoeveelheid = '"+hoeveelheid+"' WHERE fk_ingredientnaam = '"+ingredientnaam+"' AND datum ='"+datum+"' AND fk_gebruikersnaam='"+gebruikersnaam+"'"; 
				
		try (Connection con = getConnection()) {
			
			Statement stmt = con.createStatement();
			stmt.executeUpdate(query);
					
		} catch (SQLException sqle) {
			sqle.printStackTrace();
		}
}

}
