install_packages:
	cd src && npm install

run_app:
	cd src && npm start

pull_based_image:
	docker pull node:20.17.0-bookworm-slim

run_based_image:
	docker container run --name node node:20.17.0-bookworm-slim

copy_src:
	docker container cp ./src node:/root/

commit_change:
	docker container commit node hello:0.0.1

run_hello:
	docker container run -p 3000:3000 --name hello-api hello:0.0.1 node /root/src/index.js

run_hello_4000:
	docker container run -e "PORT=4000" -p 4000:4000 --name hello-api hello:0.0.1 node /root/src/index.js

rm_hello:
	docker container rm -f hello-api