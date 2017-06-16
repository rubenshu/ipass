package voedseldagboek.dagboek.domain;

import java.util.Date;

import javax.json.JsonValue;

public class Gebruikerdata extends Gebruikerlogin{
	// VARIABLES
	private Gebruikerlogin gebruikerlogin;
	private String voornaam;
	private String achternaam;
	private Date geboortedatum;
	private int leeftijd;
	private double lengte;
	private double gewicht;
	private String geslacht;
	private double activiteit;

	// CONSTRUCTOR
	public Gebruikerdata(String voornaam, String achternaam, Date geboortedatum, int leeftijd, double lengte, double gewicht, String geslacht, double activiteit) {
		this.voornaam = voornaam;
		this.achternaam = achternaam;
		this.geboortedatum = geboortedatum;
		this.leeftijd = leeftijd;
		this.lengte = lengte;
		this.gewicht = gewicht;
		this.geslacht = geslacht;
		this.activiteit = activiteit;
	}
	
	public Gebruikerdata(String gebruikersnaam, String wachtwoord, String emailadres, String voornaam, String achternaam, Date geboortedatum, int leeftijd, double lengte, double gewicht, String geslacht, double activiteit) {
		super(gebruikersnaam, wachtwoord, emailadres);
		this.voornaam = voornaam;
		this.achternaam = achternaam;
		this.geboortedatum = geboortedatum;
		this.leeftijd = leeftijd;
		this.lengte = lengte;
		this.gewicht = gewicht;
		this.geslacht = geslacht;
		this.activiteit = activiteit;
	}
	


	// GETTERS
	public Gebruikerlogin getGebruikerlogin() {return gebruikerlogin;}
	public String getVoornaam() {return voornaam;}
	public String getAchternaam() {return achternaam;}
	public Date getGeboortedatum() {return geboortedatum;}
	public int getLeeftijd() {return leeftijd;}
	public double getLengte() {return lengte;}
	public double getGewicht() {return gewicht;}
	public String getGeslacht() {return geslacht;}
	public double getActiviteit() {return activiteit;}

	// SETTERS
	public void setGebruikerlogin(Gebruikerlogin gebruikerlogin) {this.gebruikerlogin = gebruikerlogin;}
	public void setachternaam(String achternaam) {this.achternaam = achternaam;}
	public void setgeboortedatum(Date geboortedatum) {this.geboortedatum = geboortedatum;}
	public void setleeftijd(int leeftijd) {this.leeftijd = leeftijd;}
	public void setlengte(double lengte) {this.lengte = lengte;}
	public void setgewicht(double gewicht) {this.gewicht = gewicht;}
	public void setgeslacht(String geslacht) {this.geslacht = geslacht;}
	public void setActiviteit(double activiteit) {this.activiteit = activiteit;}

}
