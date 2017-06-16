package voedseldagboek.dagboek.persistence;

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
				String emailadres = dbResultSet.getString("emailadres");
				String voornaam = dbResultSet.getString("voornaam");
				String achternaam = dbResultSet.getString("achternaam");
				String geboortedatum = dbResultSet.getString("geboortedatum");
				int leeftijd = dbResultSet.getInt("leeftijd");
				double lengte = dbResultSet.getDouble("lengte");
				double gewicht = dbResultSet.getDouble("gewicht");
				String geslacht = dbResultSet.getString("geslacht");
				double activiteit = dbResultSet.getDouble("activiteit");
				String role = dbResultSet.getString("role");
				
				Gebruiker newGebruikerdata = new Gebruiker(gebruikersnaam, "", emailadres, voornaam, achternaam, geboortedatum, leeftijd, lengte, gewicht, geslacht, activiteit, role);
				
				results.add(newGebruikerdata);
			}
		} catch (SQLException sqle) {
			sqle.printStackTrace();
		}
		
		return results;
	}
	
	
	public Gebruiker findByString(String gebruikersnaam) {
		return selectGebruikers("SELECT gebruikersnaam FROM Gebruiker WHERE gebruikersnaam = '"+gebruikersnaam +"'").get(0);
	}

	public void insertNewGebruiker(String gebruikersnaam, String wachtwoord, String emailadres, String voornaam, String achternaam,
			String geboortedatum, double gewicht, int lengte, String geslacht, double activiteit) {
				String query = "insert into gebruiker(gebruikersnaam, wachtwoord, emailadres, voornaam, achternaam, geboortedatum, gewicht, lengte, geslacht, activiteit, role) values('"+gebruikersnaam+"','"+wachtwoord+"','"+emailadres+"','"+voornaam+"','" + achternaam + "','" + geboortedatum + "','" + gewicht + "','" + lengte + "','" + geslacht + "','" + activiteit + "','user')";
				try (Connection con = super.getConnection()) {
					Statement stmt = con.createStatement();
					stmt.execute(query);
					
					
				} catch (SQLException sqle) {
					sqle.printStackTrace();
		}
	}
}