# HELM

> [!IMPORTANT]  
> **Goal:** Create Wordpress with HELM
>
> - By default
> - Custom values with ingress

Ref: <https://artifacthub.io/packages/helm/bitnami/wordpress#wordpress-configuration-parameters>

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

## Work with HELM

<https://helm.sh/docs/intro/install/>

### Install Wordpress with HELM (CLI)

Add repository

```sh
helm repo add bitnami https://charts.bitnami.com/bitnami
```

Install wordpress with HELM

```sh
helm install my-wordpress bitnami/wordpress --version 22.1.7
```

Check helm

```sh
helm ls
```

Checking pod running

```sh
kubectl get pod -w
```

Checking all resources

```sh
kubectl get all
```

:computer: output:

```sh
NAME                               READY   STATUS    RESTARTS   AGE
pod/my-wordpress-mariadb-0         1/1     Running   0          2m10s
pod/my-wordpress-b954cc6c4-m9twk   1/1     Running   0          2m10s

NAME                           TYPE           CLUSTER-IP     EXTERNAL-IP                                               PORT(S)                      AGE
service/kubernetes             ClusterIP      10.43.0.1      <none>                                                    443/TCP                      3m4s
service/my-wordpress-mariadb   ClusterIP      10.43.112.37   <none>                                                    3306/TCP                     2m11s
service/my-wordpress           LoadBalancer   10.43.60.134   192.168.165.2,192.168.165.3,192.168.165.4,192.168.165.5   80:30577/TCP,443:30499/TCP   2m11s

NAME                           READY   UP-TO-DATE   AVAILABLE   AGE
deployment.apps/my-wordpress   1/1     1            1           2m11s

NAME                                     DESIRED   CURRENT   READY   AGE
replicaset.apps/my-wordpress-b954cc6c4   1         1         1       2m11s

NAME                                    READY   AGE
statefulset.apps/my-wordpress-mariadb   1/1     2m11s
```

Go to <http://localhost:8888/> for landing page

Go to <http://localhost:8888/wp-admin/> for admin page

> if LoadBalancer EXTERNAL-IP is pending for long time, try this `kubectl port-forward service/my-wordpress 8881:80` and go to <http://localhost:8881> instead

Username: user

Password:

```sh
kubectl get secret --namespace default my-wordpress -o jsonpath="{.data.wordpress-password}" | base64 -d ; echo
```

View all manifest

```sh
helm get manifest my-wordpress
```

---

### Custom values - add ingress

Check service

```sh
kubectl get services
```

It will display `LoadBalancer` service

Check ingress

```sh
kubectl get ingress
```

It will display no ingress

Create `values.yaml`

```sh
service:
  type: ClusterIP
ingress:
  enabled: true
```

Upgrade with custom values

```sh
helm upgrade my-wordpress bitnami/wordpress -f values.yaml
```

Get Service

```sh
kubectl get service
```

Service type change from LoadBalancer to ClusterIP

Get Ingress

```sh
kubectl get ingress
```

:computer: output:

```sh
NAME           CLASS     HOSTS             ADDRESS                                                   PORTS   AGE
my-wordpress   traefik   wordpress.local   192.168.227.2,192.168.227.3,192.168.227.4,192.168.227.5   80      4m53s
```

Go to <http://localhost:8888/> still not work

Update `values.yaml`

```sh
service:
  type: ClusterIP
ingress:
  enabled: true
  extraRules:
    - http:
        paths:
        - path: /
          pathType: Prefix
          backend:
            service:
              name: my-wordpress   # WordPress service name
              port:
                number: 80 
```

Upgrade

```sh
helm upgrade my-wordpress bitnami/wordpress -f values.yaml
```

Go to <http://localhost:8888/> or <http://localhost:8888/wp-admin/> and try to login with own username, password

---

### HELM Rollback

HELM history
> $ helm history <RELEASE_NAME>

```sh
helm history my-wordpress
```

HELM Rollback
> $ helm rollback <RELEASE_NAME> <REVISION_NUMBER>

```sh
helm rollback my-wordpress 2
```
