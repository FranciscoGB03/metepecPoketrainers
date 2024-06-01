CREATE TABLE `equipo_insignia` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `nombre` varchar(255)
);

CREATE TABLE `liga` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `nombre` varchar(255),
  `pc_max` integer
);

CREATE TABLE `competidor` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `nombre` varchar(255),
  `equipo_id` integer,
  `puntos` integer,
  `created_at` timestamp
);

CREATE TABLE `top_mundial` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `nombre_jugador` varchar(255),
  `equipo_insignia` varchar(255),
  `puntos_totales` integer
);

CREATE TABLE `equipo_competidor` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `competidor_id` integer,
  `pokemon` varchar(255),
  `ataque_basico` varchar(255),
  `primer_ataque_cargado` varchar(255),
  `segundo_ataque_cargado` varchar(255),
  `url_pokemon` varchar(255),
  `liga_id` integer
);

ALTER TABLE `competidor` ADD FOREIGN KEY (`equipo_id`) REFERENCES `equipo_insignia` (`id`);

ALTER TABLE `equipo_competidor` ADD FOREIGN KEY (`liga_id`) REFERENCES `liga` (`id`);

ALTER TABLE `equipo_competidor` ADD FOREIGN KEY (`competidor_id`) REFERENCES `competidor` (`id`);
