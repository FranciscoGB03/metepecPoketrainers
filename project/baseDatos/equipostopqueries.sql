CREATE TABLE `equipo_top` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `liga_id` integer,
  `posicion` integer,
  `pokemon1` integer,
  `ataque_rapido1` integer,
  `primer_cargado1` integer,
  `segundo_cargado1` integer,
  `pokemon2` integer,
  `ataque_rapido2` integer,
  `primer_cargado2` integer,
  `segundo_cargado2` integer,
  `pokemon3` integer,
  `ataque_rapido3` integer,
  `primer_cargado3` integer,
  `segundo_cargado3` integer
);

ALTER TABLE `equipo_top` ADD FOREIGN KEY (`pokemon1`) REFERENCES `pokemon` (`id`);

ALTER TABLE `equipo_top` ADD FOREIGN KEY (`ataque_rapido1`) REFERENCES `ataque_rapido` (`id`);

ALTER TABLE `equipo_top` ADD FOREIGN KEY (`primer_cargado1`) REFERENCES `ataque_cargado` (`id`);

ALTER TABLE `equipo_top` ADD FOREIGN KEY (`segundo_cargado1`) REFERENCES `ataque_cargado` (`id`);

ALTER TABLE `equipo_top` ADD FOREIGN KEY (`pokemon2`) REFERENCES `pokemon` (`id`);

ALTER TABLE `equipo_top` ADD FOREIGN KEY (`ataque_rapido2`) REFERENCES `ataque_rapido` (`id`);

ALTER TABLE `equipo_top` ADD FOREIGN KEY (`primer_cargado2`) REFERENCES `ataque_cargado` (`id`);

ALTER TABLE `equipo_top` ADD FOREIGN KEY (`segundo_cargado2`) REFERENCES `ataque_cargado` (`id`);

ALTER TABLE `equipo_top` ADD FOREIGN KEY (`pokemon3`) REFERENCES `pokemon` (`id`);

ALTER TABLE `equipo_top` ADD FOREIGN KEY (`ataque_rapido3`) REFERENCES `ataque_rapido` (`id`);

ALTER TABLE `equipo_top` ADD FOREIGN KEY (`primer_cargado3`) REFERENCES `ataque_cargado` (`id`);

ALTER TABLE `equipo_top` ADD FOREIGN KEY (`segundo_cargado3`) REFERENCES `ataque_cargado` (`id`);

ALTER TABLE `equipo_top` ADD FOREIGN KEY (`liga_id`) REFERENCES `liga` (`id`);