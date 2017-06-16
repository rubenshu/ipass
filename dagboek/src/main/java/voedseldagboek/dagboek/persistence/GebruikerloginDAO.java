/*package voedseldagboek.dagboek.persistence;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import voedseldagboek.dagboek.domain.Gebruiker;

public class GebruikerDAO extends BaseDAO {
	public String findRoleForUsernameAndPassword(String username, String password) {
		String role = null;
		String query = "SELECT role FROM Gebruiker WHERE gebruikersnaam = ? AND wachtwoord = ?";

		try (Connection con = super.getConnection()) {

			PreparedStatement pstmt = con.prepareStatement(query);
			pstmt.setString(1, username);
			pstmt.setString(2, password);

			ResultSet rs = pstmt.executeQuery();
			if (rs.next())
				role = rs.getString("role");

		} catch (SQLException sqle) {
			sqle.printStackTrace();
		}

		return role;
	}
	
	private List<Gebruiker> selectGebruikers(String query) {
		List<Gebruiker> results = new ArrayList<Gebruiker>();
		
		try (Connection con = super.getConnection()) {
			Statement stmt = con.createStatement();
			ResultSet dbResultSet = stmt.executeQuery(query);
			
			while (dbResultSet.next()) {
				String gebruikersnaam = dbResultSet.getString("gebruikersnaam");
				Gebruiker newGebruiker = new Gebruiker(gebruikersnaam, "", "", gebruikersnaam, gebruikersnaam, gebruikersnaam, 0, 0, 0, gebruikersnaam, 0, gebruikersnaam);
				results.add(newGebruiker);
			}
		} catch (SQLException sqle) {
			sqle.printStackTrace();
		}
		
		return results;
	}
	
	public Gebruiker findByString(String gebruikersnaam) {
		return selectGebruikers("SELECT gebruikersnaam FROM Gebruiker WHERE gebruikersnaam = '"+gebruikersnaam +"'").get(0);
	}
	
}
*/