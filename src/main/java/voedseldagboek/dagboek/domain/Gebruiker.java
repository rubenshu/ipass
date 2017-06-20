package voedseldagboek.dagboek.domain;

public class Gebruiker{
	// VARIABLES
	private String gebruikersnaam;
	private String wachtwoord;
	private String emailadres;
	private String voornaam;
	private String achternaam;
	private String geboortedatum;
	private double lengte;
	private double gewicht;
	private String geslacht;
	private double activiteit;
	private String role;

	// CONSTRUCTOR
	public Gebruiker(String gebruikersnaam, String wachtwoord, String emailadres,String voornaam, String achternaam, String geboortedatum, double lengte, double gewicht, String geslacht, double activiteit, String role) {
		this.gebruikersnaam = gebruikersnaam;
		this.wachtwoord = wachtwoord;
		this.emailadres = emailadres;
		this.voornaam = voornaam;
		this.achternaam = achternaam;
		this.geboortedatum = geboortedatum;
		this.lengte = lengte;
		this.gewicht = gewicht;
		this.geslacht = geslacht;
		this.activiteit = activiteit;
		this.role = role;
	}

	// GETTERS
	public String getGebruikersnaam() {return gebruikersnaam;}
	public String getWachtwoord() {return wachtwoord;}
	public String getEmailadres() {return emailadres;}
	public String getVoornaam() {return voornaam;}
	public String getAchternaam() {return achternaam;}
	public String getGeboortedatum() {return geboortedatum;}
	public double getLengte() {return lengte;}
	public double getGewicht() {return gewicht;}
	public String getGeslacht() {return geslacht;}
	public double getActiviteit() {return activiteit;}
	public String getRole() {return role;}

	// SETTERS
	public void setGebruikersnaam(String gebruikersnaam) {this.gebruikersnaam = gebruikersnaam;}
	public void setWachtwoord(String wachtwoord) {this.wachtwoord = wachtwoord;}
	public void setEmailadres(String emailadres) {this.emailadres = emailadres;}
	public void setachternaam(String achternaam) {this.achternaam = achternaam;}
	public void setgeboortedatum(String geboortedatum) {this.geboortedatum = geboortedatum;}
	public void setlengte(double lengte) {this.lengte = lengte;}
	public void setgewicht(double gewicht) {this.gewicht = gewicht;}
	public void setgeslacht(String geslacht) {this.geslacht = geslacht;}
	public void setActiviteit(double activiteit) {this.activiteit = activiteit;}
	public void setRole(String role) {this.role = role;}

}
