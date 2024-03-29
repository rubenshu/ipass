CREATE TABLE gebruiker (
	gebruikersnaam varchar(20) NOT NULL UNIQUE,
	wachtwoord varchar(20) NOT NULL,
	emailadres varchar(40) NOT NULL UNIQUE,
	voornaam varchar(20) NOT NULL,
	achternaam varchar(40) NOT NULL,
	geboortedatum varchar(10) NOT NULL,
	lengte integer NOT NULL,
	gewicht decimal(4,1) NOT NULL,
	geslacht char(1) NOT NULL,
	activiteit decimal(4,3) NOT NULL,
	role varchar(20) NOT NULL,
    PRIMARY KEY (gebruikersnaam)
);

CREATE TABLE ingredient (
	ingredientnaam varchar(40) NOT NULL UNIQUE,
	calorieen integer NOT NULL,
	vet numeric NOT NULL,
	verzadigd_vet numeric NOT NULL,
	eiwit numeric NOT NULL,
	koolhydraten numeric NOT NULL,
	vezels numeric NOT NULL,
	zout numeric NOT NULL,
    PRIMARY KEY (ingredientnaam)
);

CREATE TABLE dagboek (
	dagboek_id integer NOT NULL UNIQUE,
	hoeveelheid integer NOT NULL,
	datum varchar(10) NOT NULL,
	FK_ingredientnaam varchar(40),
	FK_gebruikersnaam varchar(20),
    PRIMARY KEY (dagboek_id),
	FOREIGN KEY (FK_ingredientnaam) REFERENCES ingredient (ingredientnaam) ON DELETE CASCADE,
	FOREIGN KEY (FK_gebruikersnaam) REFERENCES gebruiker (gebruikersnaam)
);

INSERT INTO "ingredient" VALUES ('Meergranen biscuits', 503, 24.5, 12, 7.3, 63.4, 5.2, 0.4);
INSERT INTO "ingredient" VALUES ('Chocolade, puur, 85%', 585, 47, 29, 11.2, 22, 0, 0.03);
INSERT INTO "ingredient" VALUES ('Cashewnoten', 44, 7.8, 18, 30, 3.3, 0.03);
INSERT INTO "ingredient" VALUES ('Schouderham', 100, 6.2, 2.1, 16.4, 2.4, 0.4, 2.25);
INSERT INTO "ingredient" VALUES ('Kaas, jong belegen 48+', 381, 31, 21, 24, 0, 0, 2);
INSERT INTO "ingredient" VALUES ('Paprika, gekookt', 25, 0.1, 0, 0.8, 4.2, 1.9, 0);
INSERT INTO "ingredient" VALUES ('Banaan', 89, 0.9, 0.3, 1.2, 20.4, 1.9, 0.0);
INSERT INTO "ingredient" VALUES ('Ei, gekookt', 128, 8.8, 2.9, 0, 12.3, 0, 0.37);
INSERT INTO "ingredient" VALUES ('Wortel', 27, 0.2, 0, 0.9, 10, 2.8, 0);
INSERT INTO "ingredient" VALUES ('Aardappel', 75, 0, 0, 2, 17, 2.2, 0);
INSERT INTO "ingredient" VALUES ('Aardbei', 32, 0.3, 0, 0.7, 8, 2, 0);
INSERT INTO "ingredient" VALUES ('Volkorenbrood', 293, 3.3, 0.7, 11, 54, 2.3, 0.6);
INSERT INTO "ingredient" VALUES ('Druiven, wit', 137, 0.7, 0.2, 0.9, 30.4, 2.5, 0.01);
INSERT INTO "ingredient" VALUES ('Druiven, rood', 137, 0.7, 0.2, 0.9, 30.4, 2.5, 0.01);
INSERT INTO "ingredient" VALUES ('Griekse feta', 257, 23, 13, 17, 0.7, 0, 1.2);
INSERT INTO "ingredient" VALUES ('Kipfilet', 110, 1.5, 0.5, 23, 0, 0, 0.1);