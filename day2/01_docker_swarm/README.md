# Docker swarm

## Start swarm mode

```sh
docker swarm init
```

## Stack deploy

```sh
docker stack deploy --compose-file docker-swarm.yml stackdemo
```

## View service

```sh
docker service ls
```

## Scale service

```sh
docker service scale stackdemo_my_nginx=3
```

## Try remove a container

```sh
docker container rm -f <CONTAINER_ID>
```

## Remove service

```sh
docker stack rm stackdemo
```

## Leave swarm mode

```sh
docker swarm leave --force
```
