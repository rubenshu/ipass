package voedseldagboek.dagboek.persistence;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import voedseldagboek.dagboek.domain.Gebruiker;

//Extending base DAO for functionality
public class GebruikerDAO extends BaseDAO {
	
	//For login authentication
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
	
	//The select method. This method is called when a return is needed.
	private List<Gebruiker> selectGebruikers(String query) {
		// New List to store values in
		List<Gebruiker> results = new ArrayList<Gebruiker>();
		
		//Make the connection to the DB
		try (Connection con = super.getConnection()) {
			Statement stmt = con.createStatement();
			//Query gets passed into the executeQuery
			ResultSet dbResultSet = stmt.executeQuery(query);
			
			//As long as there is a next result, save the results in a new Ingredient object and add it to the results
			while (dbResultSet.next()) {
				String gebruikersnaam = dbResultSet.getString("gebruikersnaam");
				String wachtwoord = "";
				String emailadres = dbResultSet.getString("emailadres");
				String voornaam = dbResultSet.getString("voornaam");
				String achternaam = dbResultSet.getString("achternaam");
				String geboortedatum = dbResultSet.getString("geboortedatum");
				double lengte = dbResultSet.getDouble("lengte");
				double gewicht = dbResultSet.getDouble("gewicht");
				String geslacht = dbResultSet.getString("geslacht");
				double activiteit = dbResultSet.getDouble("activiteit");
				String role = dbResultSet.getString("role");
				
				Gebruiker newGebruikerdata = new Gebruiker(gebruikersnaam, wachtwoord, emailadres, voornaam, achternaam, geboortedatum, lengte, gewicht, geslacht, activiteit, role);
				
				results.add(newGebruikerdata);
			}
			//Catch any errors if the try statement fails
		} catch (SQLException sqle) {
			sqle.printStackTrace();
		}
		// Return the results
		return results;
	}
	
	//Select & return 1 gebruiker
	public Gebruiker findByString(String gebruikersnaam) {
		return selectGebruikers("SELECT gebruikersnaam, wachtwoord, emailadres, voornaam, achternaam, geboortedatum, gewicht, lengte, geslacht, activiteit, role FROM gebruiker WHERE gebruikersnaam = '"+gebruikersnaam +"'").get(0);
	}

	//Insert a new gebruiker (registration)
	public boolean insertNewGebruiker(String gebruikersnaam, String wachtwoord, String emailadres, String voornaam, String achternaam,
			String geboortedatum, double gewicht, int lengte, String geslacht, double activiteit) {
		boolean result = false;
				String query = "insert into gebruiker(gebruikersnaam, wachtwoord, emailadres, voornaam, achternaam, geboortedatum, gewicht, lengte, geslacht, activiteit, role) values('"+gebruikersnaam+"','"+wachtwoord+"','"+emailadres+"','"+voornaam+"','" + achternaam + "','" + geboortedatum + "','" + gewicht + "','" + lengte + "','" + geslacht + "','" + activiteit + "','user')";
				try (Connection con = super.getConnection()) {
					Statement stmt = con.createStatement();
					if (stmt.executeUpdate(query) == 1) { // Statement succesful
						result = true;
					}
				} catch (SQLException sqle) {
					sqle.printStackTrace();
		}
				return result;
	}

	//Update an existing gebruiker
	public boolean updateGebruiker(String voornaam, String achternaam, String emailadres, String geboortedatum,
			double gewicht, int lengte, String geslacht, double activiteit, String gebruikersnaam) {
		boolean result = false;
		String query = "UPDATE gebruiker SET voornaam = '"+voornaam+"', achternaam = '" + achternaam + "', emailadres = '" + emailadres + "', geboortedatum = '" + geboortedatum + "', gewicht = '" + gewicht + "', lengte = '" + lengte + "', geslacht = '" + geslacht + "', activiteit = '" + activiteit + "' WHERE gebruikersnaam = '"+gebruikersnaam+"'";
		
		try (Connection con = super.getConnection()) {
	Statement stmt = con.createStatement();
	if (stmt.executeUpdate(query) == 1) { // Statement succesful
	result = true;
	}
	
} catch (SQLException sqle) {
	sqle.printStackTrace();
}
		return result;
}
	}
