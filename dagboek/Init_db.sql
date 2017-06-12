CREATE TABLE gebruikerlogin (
	gebruikersnaam varchar(20) NOT NULL UNIQUE,
	wachtwoord varchar(20) NOT NULL,
	emailadres varchar(40) NOT NULL UNIQUE,
    PRIMARY KEY (gebruikersnaam)
);

CREATE TABLE gebruikerdata (
	FK_gebruikersnaam varchar(20) references gebruikerlogin ON DELETE CASCADE,
	voornaam varchar(20) NOT NULL,
	achternaam varchar(40) NOT NULL,
	geboortedatum date NOT NULL,
	leeftijd integer NOT NULL,
	lengte decimal(3,2) NOT NULL,
	gewicht decimal(4,1) NOT NULL,
	geslacht char(1) NOT NULL,
    PRIMARY KEY (FK_gebruikersnaam),
	FOREIGN KEY (FK_gebruikersnaam) REFERENCES gebruikerlogin (gebruikersnaam)
);

CREATE TABLE ingredient (
	ingredientnaam varchar(40) NOT NULL UNIQUE,
	calorieen integer NOT NULL,
	vet decimal(10,1) NOT NULL,
	verzagigd_vet decimal(10,1) NOT NULL,
	eiwit decimal(10,1) NOT NULL,
	koolhydraten decimal(10,1) NOT NULL,
	vezels decimal(10,1) NOT NULL,
	zout decimal(10,1) NOT NULL,
    PRIMARY KEY (ingredientnaam)
);

CREATE TABLE dagboek (
	dagboek_id integer NOT NULL UNIQUE,
	hoeveelheid integer NOT NULL,
	datum date NOT NULL,
	FK_ingredientnaam varchar(40),
	FK_gebruikersnaam varchar(40),
    PRIMARY KEY (dagboek_id),
	FOREIGN KEY (FK_ingredientnaam) REFERENCES ingredient (ingredientnaam),
	FOREIGN KEY (FK_gebruikersnaam) REFERENCES gebruikerlogin (gebruikersnaam)
);

INSERT INTO "ingredient" VALUES ('Banaan', 89, 0.9, 0.3, 1.2, 20.4, 1.9, 0.0);