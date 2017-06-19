package voedseldagboek.dagboek.domain;

import voedseldagboek.dagboek.persistence.GebruikerDAO;

public class GebruikerService {
	// New DAO so function calling is available
	private GebruikerDAO gebruikerDAO = new GebruikerDAO();
	
	//From the resource the call gets here & it's passed to the DAO
	public Gebruiker getGebruiker(String gebruikersnaam) {return gebruikerDAO.findByString(gebruikersnaam);}
	public void insertNewGebruiker(String gebruikersnaam, String wachtwoord, String emailadres, String voornaam, String achternaam,String geboortedatum, double gewicht, int lengte, String geslacht, double activiteit) {gebruikerDAO.insertNewGebruiker(gebruikersnaam, wachtwoord, emailadres, voornaam, achternaam, geboortedatum, gewicht, lengte, geslacht, activiteit);}
	public void updateGebruiker(String voornaam, String achternaam, String emailadres, String geboortedatum,double gewicht, int lengte, String geslacht, double activiteit, String gebruikersnaam) {gebruikerDAO.updateGebruiker(voornaam, achternaam, emailadres, geboortedatum, gewicht, lengte, geslacht, activiteit, gebruikersnaam);}
}
