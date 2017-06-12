package voedseldagboek.dagboek.domain;

public class Gebruikerlogin {
	// VARIABLES
	private String gebruikersnaam;
	private String wachtwoord;
	private String emailadres;

	// CONSTRUCTOR
	public Gebruikerlogin(String gebruikersnaam, String wachtwoord, String emailadres) {
		this.gebruikersnaam = gebruikersnaam;
		this.wachtwoord = wachtwoord;
		this.emailadres = emailadres;
	}
	
	// GETTERS
	public String getGebruikersnaam() {return gebruikersnaam;}
	public String getWachtwoord() {return wachtwoord;}
	public String getEmailadres() {return emailadres;}

	// SETTERS
	public void setGebruikersnaam(String gebruikersnaam) {this.gebruikersnaam = gebruikersnaam;}
	public void setWachtwoord(String wachtwoord) {this.wachtwoord = wachtwoord;}
	public void setEmailadres(String emailadres) {this.emailadres = emailadres;}

}
