/* Database repertorio */
CREATE DATABASE repertorio

/* Tabla repertorio */
CREATE TABLE repertorio (
    id SERIAL,
    cancion VARCHAR (50),
    artista VARCHAR (50),
    tono VARCHAR (10)
)

/* COnsulta Database */
SELECT * FROM repertorio

