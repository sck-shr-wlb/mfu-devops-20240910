create_hello_network:
	docker network create hello

list_network:
	docker network ls

inspect_network:
	docker network inspect hello

delete_hello_network:
	docker network rm hello

start_db_with_network:
	docker container run --rm --name mysql9 \
	-v ./data/:/docker-entrypoint-initdb.d/ \
	-e MYSQL_ROOT_PASSWORD=password \
	-e MYSQL_DATABASE=mydatabase \
	-e MYSQL_USER=admin \
	-e MYSQL_PASSWORD=password \
	--network hello \
	-d mysql:9.0.1-oraclelinux9

stop_db: 
	docker stop mysql9

list_containers:
	docker container ls

install_packages:
	cd src && npm install

build_api:
	cd src &&  docker build -t api:0.0.1 .

start_api_with_network:
	docker container run --rm -d --name api \
	-e DB_HOST=mysql9 \
	-e DB_USER=admin \
	-e DB_PASSWORD=password \
	-e DB_NAME=mydatabase \
	-e DB_PORT=3306 \
	-e PORT=3000 \
	-p 3000:3000 \
	--network hello \
	api:0.0.1

stop_api:
	docker container stop api

get_users:
	curl http://localhost:3000/api/users