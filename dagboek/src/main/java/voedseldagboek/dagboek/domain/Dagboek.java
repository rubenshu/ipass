package voedseldagboek.dagboek.domain;

import java.util.Date;

public class Dagboek {
	// VARIABLES
	private int dagboek_id;
	private int hoeveelheid;
	private Date datum;

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

	// SETTERS
	public void setDagboek_id(int dagboek_id) {this.dagboek_id = dagboek_id;}
	public void setHoeveelheid(int hoeveelheid) {this.hoeveelheid = hoeveelheid;}
	public void setDatum(Date datum) {this.datum = datum;}
	
}
