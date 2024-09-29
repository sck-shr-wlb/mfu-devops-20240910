# LoadBalancer

> [!IMPORTANT]  
> **Goal:** Create service with **LoadBalancer** type and connecting from external

![diagram](diagram.png)

---

## Setup Cluster

Delete existing cluster

```sh
k3d cluster delete my-cluster
```

Create new cluster with expose loadbalancer port

```sh
k3d cluster create my-cluster --servers 1 --agents 1 --port "8888:80@loadbalancer"
```

## Create LoadBalancer service type

Create `service.yml`

```sh
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
  labels:
    app: nginx-deployment
spec:
  replicas: 1
  selector:
    matchLabels:
      app: my-nginx # has to match .spec.template.metadata.labels.app
  template:
    metadata:
      labels:
        app: my-nginx
    spec:
      containers:
      - name: nginx
        image: nginx:1.24.0
        ports:
        - containerPort: 80
---
apiVersion: v1
kind: Service
metadata:
  name: nginx-service
spec:
  type: LoadBalancer
  selector:
    app: my-nginx # has to match .spec.template.metadata.labels.app on kind: Deployment
  ports:
    - protocol: TCP
      port: 80
      targetPort: 80
      # nodePort: 30080 # range (30000-32767)
```

Apply

```sh
kubectl apply -f service.yml 
```

Get all

```sh
kubectl get all
```

or

```sh
kubectl get service
```

:computer: output:

```sh
NAME                    TYPE           CLUSTER-IP     EXTERNAL-IP                                               PORT(S)        AGE
service/kubernetes      ClusterIP      10.43.0.1      <none>                                                    443/TCP        53s
service/nginx-service   LoadBalancer   10.43.146.28   192.168.172.2,192.168.172.3,192.168.172.4,192.168.172.5   80:31281/TCP   22s
```

Checking `TYPE` and `EXTERNAL-IP`

Go to: <http://localhost:8888>

Should see nginx page
