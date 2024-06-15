ALTER TABLE pokemon.ataque_rapido ADD nombre_la varchar(255) NULL;
ALTER TABLE pokemon.ataque_rapido CHANGE nombre_la nombre_la varchar(255) NULL AFTER nombre_es;

ALTER TABLE pokemon.ataque_cargado ADD nombre_la varchar(100) NULL;
ALTER TABLE pokemon.ataque_cargado CHANGE nombre_la nombre_la varchar(100) NULL AFTER nombre_es;
