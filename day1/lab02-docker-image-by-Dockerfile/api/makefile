build_hello:
	cd src && docker image build -t hello:0.0.2 .

run_hello:
	docker container run -e "PORT=3000" -p 3000:3000 --name hello-api hello:0.0.2

rm_hello:
	docker container rm -f hello-api

# --------- dump-init----------

build_hello_dump_init:
	cd src && docker image build -f Dockerfile-dump-init -t hello:0.0.3 .

run_hello_dump_init:
	docker container run -e "PORT=3000" -p 3000:3000 --name hello-api hello:0.0.3