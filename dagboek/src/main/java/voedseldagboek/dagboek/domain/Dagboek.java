package voedseldagboek.dagboek.domain;

import java.util.Date;

public class Dagboek {
	// VARIABLES
	private int dagboek_id;
	private int hoeveelheid;
	private Date datum;
	private Ingredient ingredient;
	private Gebruikerlogin gebruikerlogin;

	// CONSTRUCTOR
	public Dagboek(int dagboek_id, int hoeveelheid, Date datum) {
		this.dagboek_id = dagboek_id;
		this.hoeveelheid = hoeveelheid;
		this.datum = datum;
	}
	
	// GETTERS
	public int getDagboek_id() {return dagboek_id;}
	public int getHoeveelheid() {return hoeveelheid;}
	public Date getDatum() {return datum;}
	public Ingredient getIngredient() {return ingredient;}
	public Gebruikerlogin getGebruikerlogin() {return gebruikerlogin;}

	// SETTERS
	public void setDagboek_id(int dagboek_id) {this.dagboek_id = dagboek_id;}
	public void setHoeveelheid(int hoeveelheid) {this.hoeveelheid = hoeveelheid;}
	public void setDatum(Date datum) {this.datum = datum;}
	public void setIngredient(Ingredient ingredient) {this.ingredient = ingredient;}
	public void setGebruiker(Gebruikerlogin gebruikerlogin) {this.gebruikerlogin = gebruikerlogin;}
	
}
