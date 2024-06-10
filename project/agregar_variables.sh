#!/bin/bash

echo "Añadiendo variables de ambiente para usuario: $USER"

# Función para agregar o actualizar una variable en .bashrc
add_or_update_var() {
    local var_name=$1
    local var_value=$2
    local file_path="/home/$USER/.bashrc"

    # Si la variable ya existe en .bashrc, actualízala; de lo contrario, agrégala
    if grep -q "^export $var_name=" "$file_path"; then
        sed -i "s/^export $var_name=.*/export $var_name=$var_value/" "$file_path"
    else
        echo "export $var_name=$var_value" >> "$file_path"
    fi
}

# Pedir al usuario los valores de las variables
read -p "Ingrese el valor de MYSQL_USER: " MYSQL_USER
read -p "Ingrese el valor de MYSQL_PASSWORD: " MYSQL_PASSWORD
read -p "Ingrese el valor de DB_HOST: " DB_HOST
read -p "Ingrese el valor de DB_PORT_MYSQL: " DB_PORT_MYSQL
read -p "Ingrese el valor de MYSQL_DATABASE: " MYSQL_DATABASE
read -p "Ingrese el valor de MYSQL_ROOT_PASSWORD: " MYSQL_ROOT_PASSWORD
read -p "Ingrese el valor de JWT_SECRET: " JWT_SECRET

# Agregar o actualizar las variables en .bashrc
add_or_update_var "MYSQL_USER" $MYSQL_USER
add_or_update_var "MYSQL_PASSWORD" $MYSQL_PASSWORD
add_or_update_var "DB_HOST" $DB_HOST
add_or_update_var "DB_PORT_MYSQL" $DB_PORT_MYSQL
add_or_update_var "MYSQL_DATABASE" $MYSQL_DATABASE
add_or_update_var "MYSQL_ROOT_PASSWORD" $MYSQL_ROOT_PASSWORD
add_or_update_var "JWT_SECRET" $JWT_SECRET

# Recargar .bashrc
source /home/$USER/.bashrc

echo "Variables de ambiente actualizadas en /home/$USER/.bashrc y recargadas."
