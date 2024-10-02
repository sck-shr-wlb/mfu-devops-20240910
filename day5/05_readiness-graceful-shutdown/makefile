start-k3d-cluster:
	k3d cluster create default -p "8080:8080@loadbalancer" --servers 1 --agents 3

delete-k3d-cluster:
	k3d cluster delete default

build-greeting-service-001:
	cd greeting-service-001 \
	&& docker build -t greeting-service:0.0.1 . \
	&& k3d image import greeting-service:0.0.1 --cluster default

build-greeting-service-002:
	cd greeting-service-002 \
	&& docker build -t greeting-service:0.0.2 . \
	&& k3d image import greeting-service:0.0.2 --cluster default

build-greeting-service-003:
	cd greeting-service-003 \
	&& docker build -t greeting-service:0.0.3 . \
	&& k3d image import greeting-service:0.0.3 --cluster default

build-greeting-service-004:
	cd greeting-service-004 \
	&& docker build -t greeting-service:0.0.4 . \
	&& k3d image import greeting-service:0.0.4 --cluster default

build-and-load-all: build-greeting-service-001 build-greeting-service-002 build-greeting-service-003 build-greeting-service-004

apply-service-001:
	kubectl apply -f k8s/service-0.0.1.yml

apply-service-002:
	kubectl apply -f k8s/service-0.0.2.yml

apply-service-003:
	kubectl apply -f k8s/service-0.0.3.yml

apply-service-004:
	kubectl apply -f k8s/service-0.0.4.yml

hey:
	./hey_darwin_amd64 -c 20 -z 10s http://localhost:8080