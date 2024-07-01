# Etapa 1: Construcción
FROM node:16 AS build

# Establece el directorio de trabajo
WORKDIR /app

# Copia el package.json y el package-lock.json (si existe)
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de los archivos del proyecto
COPY . .

# Construye la aplicación
RUN npm run build

# Etapa 2: Servir el contenido estático
FROM nginx:alpine

# Copia los archivos estáticos desde la etapa de construcción
COPY --from=build /app/dist /usr/share/nginx/html

# Copia el archivo de configuración de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expone el puerto 80
EXPOSE 80

# Comando por defecto
CMD ["nginx", "-g", "daemon off;"]
