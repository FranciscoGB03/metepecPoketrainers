BACK_BINARY=backApp

# instancia ambos ambientes mysql y backend
deploy: build_mysql build_back

# inicia tanto front como backend
up: mysql_start back_start
# detiene ambos servicios tanto mysql como backend
stop: back_stop mysql_stop
## Esta opcion borra la imagen que se tenia y genera una nueva, hayq ue tener cuidado porque se pierden todos los datos
build_mysql: mysql_down
	@echo "Building (when required) and starting docker images..."
	docker compose up -d db
	@echo "Docker images built and started!"
##Esta opcion borra completamente la imagen
mysql_down:
	@echo "Stopping docker compose..."
	docker compose rm -s -f db
	@echo "Done!"
# solo inicia la imagen en este caso la de base de datos
mysql_start:
	@echo "Starting Docker images..."
	docker compose up -d db
	@echo "Docker images started!"

## detiene la imagen sin borrala del mysql
mysql_stop:
	@echo "Stopping Docker images mysql..."
	docker stop db
	@echo "Docker images stopped!"

##Back
## borra, compila y levanta la imagen del backend
build_back: back_down
	@echo "Building back binary"
	cd ../back && env GOOS=linux CGO_ENABLED=0 go build -o ${BACK_BINARY} ./cmd/api
	@echo "Building (when required) and starting docker images..."
	docker compose up -d back-service
	@echo "Docker images built and started!"
## down: stop back docker compose
back_down:
	@echo "Stopping docker compose..."
	docker compose rm -s -f back-service
	@echo "Done!"

# start: starts the backend
back_start:
	@echo "Starting Docker images..."
	docker compose up -d back-service
	@echo "Docker images started!"

## detiene la imagen sin borrala del backend
back_stop:
	@echo "Stopping Docker images..."
	docker stop back-service
	@echo "Docker images stopped!"
