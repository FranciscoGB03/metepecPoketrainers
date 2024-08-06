ALTER TABLE rel_rol_permisos
ADD COLUMN id INT;

-- Paso 2: Rellenar la columna 'id' con valores únicos si la tabla ya tiene datos
SET @count = 0;
UPDATE rel_rol_permisos SET id = (@count := @count + 1);

-- Paso 3: Modificar la columna 'id' para que sea AUTO_INCREMENT y clave primaria
ALTER TABLE rel_rol_permisos
MODIFY COLUMN id INT AUTO_INCREMENT PRIMARY KEY;

ALTER TABLE pokemon.rel_rol_permisos CHANGE id id int auto_increment NOT NULL FIRST;
