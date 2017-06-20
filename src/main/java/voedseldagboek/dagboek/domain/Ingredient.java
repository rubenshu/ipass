package voedseldagboek.dagboek.domain;

public class Ingredient {
	// VARIABLES
	private String ingredientnaam;
	private int calorieen;
	private double vet;
	private double verzadigd_vet;
	private double eiwit;
	private double koolhydraten;
	private double vezels;
	private double zout;

	// CONSTRUCTOR
	public Ingredient(String ingredientnaam, int calorieen, double vet, double verzadigd_vet, double eiwit,
			double koolhydraten, double vezels, double zout) {
		this.ingredientnaam = ingredientnaam;
		this.calorieen = calorieen;
		this.vet = vet;
		this.verzadigd_vet = verzadigd_vet;
		this.eiwit = eiwit;
		this.koolhydraten = koolhydraten;
		this.vezels = vezels;
		this.zout = zout;
	}
	
	// GETTERS
	public String getIngredientnaam() {return ingredientnaam;}
	public int getCalorieen() {return calorieen;}
	public double getVet() {return vet;}
	public double getVerzadigd_vet() {return verzadigd_vet;}
	public double getEiwit() {return eiwit;}
	public double getKoolhydraten() {return koolhydraten;}
	public double getVezels(){return vezels;}
	public double getZout() {return zout;}

	// SETTERS
	public void setIngredientnaam(String ingredientnaam) {this.ingredientnaam = ingredientnaam;}
	public void setCalorieen(int calorieen) {this.calorieen = calorieen;}
	public void setVet(double vet) {this.vet = vet;}
	public void setVerzadigd_vet(double verzadigd_vet) {this.verzadigd_vet = verzadigd_vet;}
	public void setEiwit(double eiwit) {this.eiwit = eiwit;}
	public void setKoolhydraten(double koolhydraten) {this.koolhydraten = koolhydraten;}
	public void setVezels(double vezels) {this.vezels = vezels;}
	public void setZout(double zout) {this.zout = zout;}
	
}
