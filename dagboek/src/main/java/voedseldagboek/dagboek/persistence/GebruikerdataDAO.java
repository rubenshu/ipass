package voedseldagboek.dagboek.persistence;

import java.sql.Connection;
import java.sql.Date;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import voedseldagboek.dagboek.domain.Gebruikerdata;
import voedseldagboek.dagboek.domain.Gebruikerlogin;

public class GebruikerdataDAO extends BaseDAO {
	private GebruikerloginDAO gebruikerloginDAO = new GebruikerloginDAO();

	private List<Gebruikerdata> selectGebruikerdata(String query) {
		List<Gebruikerdata> results = new ArrayList<Gebruikerdata>();
		
		try (Connection con = super.getConnection()) {
			Statement stmt = con.createStatement();
			ResultSet dbResultSet = stmt.executeQuery(query);
			
			while (dbResultSet.next()) {
				String voornaam = dbResultSet.getString("voornaam");
				String achternaam = dbResultSet.getString("achternaam");
				Date geboortedatum = dbResultSet.getDate("geboortedatum");
				int leeftijd = dbResultSet.getInt("leeftijd");
				double lengte = dbResultSet.getDouble("lengte");
				double gewicht = dbResultSet.getDouble("gewicht");
				String geslacht = dbResultSet.getString("geslacht");
				
				String gebruikersnaam = dbResultSet.getString("FK_gebruikersnaam");
				Gebruikerlogin gebruikerlogin = gebruikerloginDAO.findByString(gebruikersnaam);
				
				Gebruikerdata newGebruikerdata = new Gebruikerdata(voornaam, achternaam, geboortedatum, leeftijd, lengte, gewicht, geslacht);
				newGebruikerdata.setGebruikerlogin(gebruikerlogin);
				
				results.add(newGebruikerdata);
			}
		} catch (SQLException sqle) {
			sqle.printStackTrace();
		}
		
		return results;
	}
	
	//public List<Gebruikerdata> findAll() {
	//	return selectIngredients("SELECT ingredientnaam, calorieen, vet, verzadigd_vet, eiwit, koolhydraten, vezels, zout FROM ingredient");
	//}
	
	//public List<Ingredient> findToday(huidigeGebruiker, geselecteerdeDatum) {
		//return selectIngredients("SELECT ingredientnaam, calorieen, vet, verzadigd_vet, eiwit, koolhydraten, vezels, zout FROM ingredient WHERE ingredientnaam = " +ingredientNaam).get(0);
	//}
	
	public Gebruikerdata findByString(String gebruikersnaam) {
		return selectGebruikerdata("SELECT voornaam, achternaam, geboortedatum, leeftijd, lengte, gewicht, geslacht, FK_gebruikersnaam from gebruikerdata WHERE FK_gebruikersnaam = " +gebruikersnaam).get(0);
	}
}
