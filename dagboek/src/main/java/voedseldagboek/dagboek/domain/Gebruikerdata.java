package voedseldagboek.dagboek.domain;

import java.util.Date;

public class Gebruikerdata {
	// VARIABLES
	private Gebruikerlogin gebruikerlogin;
	private String voornaam;
	private String achternaam;
	private Date geboortedatum;
	private int leeftijd;
	private double lengte;
	private double gewicht;
	private String geslacht;

	// CONSTRUCTOR
	public Gebruikerdata(String voornaam, String achternaam, Date geboortedatum, int leeftijd, double lengte, double gewicht, String geslacht) {
		this.voornaam = voornaam;
		this.achternaam = achternaam;
		this.geboortedatum = geboortedatum;
		this.leeftijd = leeftijd;
		this.lengte = lengte;
		this.gewicht = gewicht;
		this.geslacht = geslacht;
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

	// SETTERS
	public void setGebruikerlogin(Gebruikerlogin gebruikerlogin) {this.gebruikerlogin = gebruikerlogin;}
	public void setachternaam(String achternaam) {this.achternaam = achternaam;}
	public void setgeboortedatum(Date geboortedatum) {this.geboortedatum = geboortedatum;}
	public void setleeftijd(int leeftijd) {this.leeftijd = leeftijd;}
	public void setlengte(double lengte) {this.lengte = lengte;}
	public void setgewicht(double gewicht) {this.gewicht = gewicht;}
	public void setgeslacht(String geslacht) {this.geslacht = geslacht;}

}
