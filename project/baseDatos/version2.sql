CREATE DATABASE IF NOT EXISTS pokemon;
USE pokemon;
CREATE TABLE `users` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `email` varchar(255),
  `rol_id` integer,
  `password` varchar(255),
   `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE `rel_rol_permisos` (
  `rol_id` integer,
  `permiso_id` integer
);

CREATE TABLE `permisos` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `nombre` varchar(255)
);

CREATE TABLE `rol` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `nombre` varchar(255)
);

CREATE TABLE `pokemon` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `numero_pokedex` integer,
  `nombre` varchar(255),
  `img_url` varchar(255)
);

CREATE TABLE `ataque_rapido` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `nombre_es` varchar(255),
  `nombre_en` varchar(255)
);

CREATE TABLE `ataque_cargado` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `nombre_es` varchar(255),
  `nombre_en` varchar(255)
);

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
  `user_id` integer
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
  `pokemon_id` integer,
  `ataque_rapido_id` integer,
  `primer_ataque_cargado` integer,
  `segundo_ataque_cargado` integer,
  `liga_id` integer
);

ALTER TABLE `competidor` ADD FOREIGN KEY (`equipo_id`) REFERENCES `equipo_insignia` (`id`);

ALTER TABLE `equipo_competidor` ADD FOREIGN KEY (`liga_id`) REFERENCES `liga` (`id`);

ALTER TABLE `equipo_competidor` ADD FOREIGN KEY (`competidor_id`) REFERENCES `competidor` (`id`);

ALTER TABLE `rol` ADD FOREIGN KEY (`id`) REFERENCES `users` (`rol_id`);

ALTER TABLE `competidor` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `rel_rol_permisos` ADD FOREIGN KEY (`rol_id`) REFERENCES `rol` (`id`);

ALTER TABLE `rel_rol_permisos` ADD FOREIGN KEY (`permiso_id`) REFERENCES `permisos` (`id`);

ALTER TABLE `equipo_competidor` ADD FOREIGN KEY (`pokemon_id`) REFERENCES `pokemon` (`id`);

ALTER TABLE `equipo_competidor` ADD FOREIGN KEY (`ataque_rapido_id`) REFERENCES `ataque_rapido` (`id`);

ALTER TABLE `equipo_competidor` ADD FOREIGN KEY (`primer_ataque_cargado`) REFERENCES `ataque_cargado` (`id`);

ALTER TABLE `equipo_competidor` ADD FOREIGN KEY (`segundo_ataque_cargado`) REFERENCES `ataque_cargado` (`id`);
