# Readiness and Graceful Shutdown

## Prerequisite

1. [k3d](https://k3d.io/v5.6.3/)
2. [hey](https://github.com/rakyll/hey)
   1. download and rename to `hey`
   2. run command: `chmod +x hey`
3. [docker](https://www.docker.com/)

---

## Getting Start

1. Workspace's skeleton

   ```txt
   readiness-graceful-shutdown
     |-greeting-service
     |-greeting-service-001
     |-greeting-service-002
     |-greeting-service-003
     |-greeting-service-004
     |-k8s
       |-service.yml
       |-service-0.0.1.yml
       |-service-0.0.2.yml
       |-service-0.0.3.yml
       |-service-0.0.4.yml
   ```

2. Open `terminal` and change directory to `readiness-graceful-shutdown`

   ```sh
   cd readiness-graceful-shutdown
   ```

3. Create cluster

   ```sh
   k3d cluster create default -p "8080:8080@loadbalancer" --servers 1 --agents 3
   kubectl get nodes
   ```

   - Delete Cluster `k3d cluster delete default`

4. Build image

   ```sh
   cd greeting-service
   docker build -t greeting-service:0.0.1 .
   k3d image import greeting-service:0.0.1 --cluster default
   docker image ls
   ```

   ```sh
   cd greeting-service
   docker build -t greeting-service:0.0.2 .
   k3d image import greeting-service:0.0.2 --cluster default
   docker image ls
   ```

   ```sh
   cd greeting-service
   docker build -t greeting-service:0.0.3 .
   k3d image import greeting-service:0.0.3 --cluster default
   docker image ls
   ```

   ```sh
   cd greeting-service
   docker build -t greeting-service:0.0.4 .
   k3d image import greeting-service:0.0.4 --cluster default
   docker image ls
   ```

   or

   ```sh
   make build-and-load-all
   docker image ls
   ```

5. Create service & deployment with `apply`

   ```sh
   kubectl apply -f k8s/service-0.0.1.yml
   ```

   ```sh
   kubectl get deployments
   kubectl get pods
   kubectl get service
   ```

   or

   ```sh
   make apply-service-001
   ```

6. Test with curl

   ```sh
   curl http://localhost:8080/
   ```

7. Test with `hey`

   ```sh
   ./hey -c 20 -z 10s http://localhost:8080
   ```

### Test Scale-Out without Readiness

1. Change `replicas` from 2 to 3 at `k8s/service-0.0.1.yaml`

   ```yaml
   apiVersion: apps/v1
   kind: Deployment
   metadata:
     labels:
       app: greeting-service
     name: greeting-service
   spec:
     replicas: 3 # change from 2 to 3
     selector:
       matchLabels:
         app: greeting-service
     template:
       metadata:
         labels:
           app: greeting-service
       spec:
         containers:
           - image: greeting-service:0.0.1
             imagePullPolicy: IfNotPresent
             name: greeting-service
   ```

2. Proof scale-out

   ![run test](./images/run-test-with-hey.png)

   1. Open new terminal and type following command[`test terminal`]

      ```sh
      ./hey -c 20 -z 10s http://localhost:8080
      ```

   2. Switch to previous terminal then type following command[`apply terminal`]

      ```sh
      kubectl apply -f k8s/service-0.0.1.yml
      ```

   3. Press `enter` on `test terminal` and switch to `apply terminal` immediately then press `enter`

3. Waiting for result

   ```sh
   Error distribution:
   [XXXXX]	Get "http://localhost:8080": EOF
   ```

4. What happens during scale-out?

---

## Add Health Check and Test Scale-Out with Readiness

1. Apply `k8s/service-0.0.2.yml`

   ```sh
   kubectl apply -f k8s/service-0.0.2.yml
   ```

   > replicas: 2

2. Change `replicas` from 2 to 3 at `k8s/service-0.0.2.yml`

   ```yaml
   apiVersion: apps/v1
   kind: Deployment
   metadata:
     labels:
       app: greeting-service
     name: greeting-service
   spec:
     replicas: 3 # change from 2 to 3
     selector:
       matchLabels:
         app: greeting-service
     template:
       metadata:
         labels:
           app: greeting-service
       spec:
         containers:
           - image: greeting-service:0.0.2
             imagePullPolicy: IfNotPresent
             name: greeting-service
   ```

3. Proof scale-out and readiness

   ![run test](./images/run-test-with-hey2.png)

   1. Open new terminal and type following command[`test terminal`]

      ```sh
      hey -c 20 -z 10s http://localhost:8080
      ```

   2. Switch to previous terminal then type following command[`apply terminal`]

      - `k8s` directory

      ```sh
      kubectl apply -f k8s/service-0.0.2.yaml
      ```

   3. Press `enter` on `test terminal` and switch to `apply terminal` immediately then press `enter`

4. What happens?

5. Check application's health

   ```sh
   curl http://localhost:8080/actuator/health
   curl http://localhost:8080/actuator/health/liveness
   curl http://localhost:8080/actuator/health/readiness
   ```

6. What is liveness and readiness?

|                                                   | Liveness                                                    | Readiness                                                                               |
| :------------------------------------------------ | :---------------------------------------------------------- | :-------------------------------------------------------------------------------------- |
| Semantic meaning                                  | Is the container running?                                   | Is the container ready to receive traffic?                                              |
| Implication of probe failures exceeding threshold | Pod is terminated and replaced.                             | Pod is removed from receiving traffic until the probe passes.                           |
| Time to recover from a failed probe               | Slow: Pod is rescheduled on failure and needs time to boot. | Fast: Pod is already running and can immediately receive traffic once the probe passes. |
| Default state at container boot                   | Passing (live).                                             | Failing (unready).                                                                      |

- from `Wiliam Denniss, Kubernetes for Developers(Manning Publications Co.), p. 80.`

---

## Scale-In and Test Scale-In without Graceful Shutdown

1. Apply `k8s/service-0.0.3.yaml`

   ```sh
   kubectl apply -f k8s/service-0.0.3.yaml
   ```

   > replicas: 4

2. Change `replicas` from 4 to 2 at `k8s/service-0.0.3.yaml`

   ```yaml
   apiVersion: apps/v1
   kind: Deployment
   metadata:
     labels:
       app: greeting-service
     name: greeting-service
   spec:
     replicas: 2 # change from 4 to 2
     selector:
       matchLabels:
         app: greeting-service
     template:
       metadata:
         labels:
           app: greeting-service
       spec:
         containers:
           - image: greeting-service:0.0.3
             imagePullPolicy: IfNotPresent
             name: greeting-service
   ```

3. Proof scaling-in

   ![run test](./images/run-test-with-hey3.png)

   1. Open new terminal and type following command[`test terminal`]

      ```sh
      hey -c 20 -z 10s http://localhost:8080
      ```

   2. Switch to previous terminal then type following command[`apply terminal`]

      ```sh
      kubectl apply -f k8s/service-0.0.3.yml
      ```

   3. Press `enter` on `test terminal` and switch to `apply terminal` immediately then press `enter`

4. Waiting for result

   ```sh
   Error distribution:
   [XXXXX]	Get "http://localhost:8080": EOF
   ```

5. What happens during scale-in?

---

## Add Graceful Shutdown and Test scale-in with graceful shutdown

1. Apply `k8s/service-0.0.4.yml`

   ```sh
   kubectl apply -f k8s/service-0.0.4.yml
   ```

   > replicas: 4

2. Change `replicas` from 4 to 2 at `k8s/service-0.0.4.yml`

   ```yaml
   apiVersion: apps/v1
   kind: Deployment
   metadata:
     labels:
       app: greeting-service
     name: greeting-service
   spec:
     replicas: 2 # change from 4 to 2
     selector:
       matchLabels:
         app: greeting-service
     template:
       metadata:
         labels:
           app: greeting-service
       spec:
         containers:
           - image: greeting-service:0.0.4
             imagePullPolicy: IfNotPresent
             name: greeting-service
   ```

3. Proof scale-in and graceful shutdown

   ![run test](./images/run-test-with-hey.png)

   1. Open new terminal and type following command[`test terminal`]

      ```sh
      hey -c 20 -z 10s http://localhost:8080
      ```

   2. Switch to previous terminal then type following command[`apply terminal`]

      - `k8s` directory

      ```sh
      kubectl apply -f k8s/service-0.0.4.yaml
      ```

   3. Press `enter` on `test terminal` and switch to `apply terminal` immediately then press `enter`

4. What happens?

---

## Tip set `preStop` at Container's Lifecycle

```yaml
spec:
  containers:
    - image: greeting-service:0.0.4
      imagePullPolicy: IfNotPresent
      name: greeting-service
      lifecycle:
        preStop:
          exec:
            command: ['sh', '-c', 'sleep 5']
```
