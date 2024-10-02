# Logs with Loki

> [!IMPORTANT]  
> **Goal:** Running Grafana with Loki logs

Ref: <https://artifacthub.io/packages/helm/grafana/loki-stack>

![dashboard](images/dashboard.png)

## Deploying Loki

Add repository

```sh
helm repo add grafana https://grafana.github.io/helm-charts
```

Install loki with HELM

```sh
helm install my-loki grafana/loki-stack -n monitoring --create-namespace
```

Create `values.yaml`

```sh
loki:
  image:
    repository: grafana/loki
    tag: 2.9.3
```

Helm upgrade

```sh
helm upgrade my-loki grafana/loki-stack -f values.yaml -n monitoring
```

Checking Loki resoures

```sh
kubectl get all -n monitoring
```

## Setup data sources on Grafana

Open Grafana then add datasources
![setup01](images/setup01.png)

choose Loki
![setup02](images/setup02.png)

Input loki server url as loki service's name

```sh
kubectl get service -n monitoring
```

So input `http://loki:3100`, Click save&test button
![setup03](images/setup03.png)

If all work, will be like this
![setup04](images/setup04.png)

Go to sidebar > Explore
![setup05](images/setup05.png)

Choose Loki
![setup06](images/setup06.png)

Choose label filter and run query
![setup07](images/setup07.png)
