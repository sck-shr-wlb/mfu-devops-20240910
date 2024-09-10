start_db:
	docker container run --rm --name mysql9 \
	-v ./data/:/docker-entrypoint-initdb.d/ \
	-e MYSQL_ROOT_PASSWORD=password \
	-e MYSQL_DATABASE=mydatabase \
	-e MYSQL_USER=admin \
	-e MYSQL_PASSWORD=password \
	-p 3306:3306 \
	-d mysql:9.0.1-oraclelinux9
 
stop_db: 
	docker stop mysql9

list_containers:
	docker container ls

install_packages:
	cd src && npm install
	
start_app:
	cd src && npm start

build_api:
	cd src && docker image build -t api:0.0.1 .

start_api:
	docker container run --rm -d --name api \
	-e DB_HOST=<IP> \
	-e DB_USER=admin \
	-e DB_PASSWORD=password \
	-e DB_NAME=mydatabase \
	-e DB_PORT=3306 \
	-e PORT=3000 \
	-p 3000:3000 \
	api:0.0.1

stop_api:
	docker container stop api

get_users:
	curl http://localhost:3000/api/users
