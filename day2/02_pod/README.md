# Pod

## Setup cluster

Create cluster

```sh
k3d cluster create my-cluster --servers 1 --agents 3
```

Checking node

```sh
kubectl get node
```

Setting taint for prevent pod deploy master node (k3d not set by default)
> [!NOTE]  
> **Specific for k3d, if your cluster is created with another way not necessary**

```sh
kubectl taint node k3d-my-cluster-server-0 node-role.kubernetes.io/master:NoSchedule
```

## Kubectl basic command

```sh
kubectl --help
```

Get node with more information

```sh
kubectl get node -o wide
```

View all resources

```sh
kubectl api-resources
```

## Run Pod

> [!IMPORTANT]  
> **Goal:** Create nginx pod in cluster

![diagram](diagram.png)

Get pod

```sh
kubectl get pod
```

Run pod with nginx image

```sh
kubectl run my-nginx --image nginx:1.25.4
```

Check pod

```sh
kubectl get pod
```

Check pod more information

```sh
kubectl get pod -o wide
```

Describe pod

```sh
kubectl describe pod my-nginx
```

View pod logs

```sh
kubectl logs my-nginx
```

Edit pod

```sh
kubectl edit pod my-nginx
```

change image to `nginx:1.24.0` and save

then run

```sh
kubectl get pod 
```

💻 output:

```sh
NAME       READY   STATUS    RESTARTS       AGE
my-nginx   1/1     Running   1 (111s ago)   28m
```

Notice RESTARTS TIME, will be just moment seconds

Describe pod again

💻 output:

```sh
Events:
  Type    Reason     Age               From               Message
  ----    ------     ----              ----               -------
  Normal  Scheduled  32m               default-scheduler  Successfully assigned default/my-nginx to k3d-my-cluster-agent-0
  Normal  Pulling    32m               kubelet            Pulling image "nginx:1.25.4"
  Normal  Pulled     32m               kubelet            Successfully pulled image "nginx:1.25.4" in 10.126673794s (10.126688933s including waiting)
  Normal  Killing    6m13s             kubelet            Container my-nginx definition changed, will be restarted
  Normal  Pulling    6m12s             kubelet            Pulling image "nginx:1.24.0"
  Normal  Pulled     6m                kubelet            Successfully pulled image "nginx:1.24.0" in 12.304054934s (12.304091644s including waiting)
  Normal  Created    6m (x2 over 32m)  kubelet            Created container my-nginx
  Normal  Started    6m (x2 over 32m)  kubelet            Started container my-nginx
```

Access to pod

```sh
kubectl port-forward my-nginx 8080:80
```

## Run Pod with yml

Delete pod

```sh
kubectl delete pod my-nginx
```

Create yml file name: `nginx.yml`

```sh
apiVersion: v1
kind: Pod
metadata:
  name: my-nginx
spec:
  containers:
  - name: nginx
    image: nginx:1.24.0
    ports:
    - containerPort: 80
```

Apply with yml file

```sh
kubectl apply -f nginx.yml
```

Edit file change image to `nginx:1.25.4` and save and apply again

Notice RESTARTS TIME, will be just moment seconds

Describe pod again, the image tag will be change to `nginx:1.25.4`

Access to pod

```sh
kubectl port-forward my-nginx 8080:80
```

## Delete pod

Delete

```sh
kubectl delete -f nginx.yml
```
