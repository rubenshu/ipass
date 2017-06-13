package voedseldagboek.dagboek.persistence;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import voedseldagboek.dagboek.domain.Gebruikerlogin;

public class GebruikerloginDAO extends BaseDAO {
	public String findRoleForUsernameAndPassword(String username, String password) {
		String role = null;
		String query = "SELECT role FROM gebruikerlogin WHERE gebruikersnaam = ? AND wachtwoord = ?";

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
	
	private List<Gebruikerlogin> selectGebruikers(String query) {
		List<Gebruikerlogin> results = new ArrayList<Gebruikerlogin>();
		
		try (Connection con = super.getConnection()) {
			Statement stmt = con.createStatement();
			ResultSet dbResultSet = stmt.executeQuery(query);
			
			while (dbResultSet.next()) {
				String gebruikersnaam = dbResultSet.getString("gebruikersnaam");
				Gebruikerlogin newGebruikerlogin = new Gebruikerlogin(gebruikersnaam, "", "");
				results.add(newGebruikerlogin);
			}
		} catch (SQLException sqle) {
			sqle.printStackTrace();
		}
		
		return results;
	}
	
	public Gebruikerlogin findByString(String gebruikersnaam) {
		return selectGebruikers("SELECT gebruikersnaam FROM gebruikerlogin WHERE gebruikersnaam = '"+gebruikersnaam +"'").get(0);
	}
	
}
