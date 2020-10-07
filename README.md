# Simple Node app

Simple Node.js containerized app deployed on a Kubernetes cluster.

Environment variables are passed to the app using Kubernetes secrets.

The variables are stored using Base64:

```bash
echo -n 'Simple Node App' | base64
```

## Docker Image

A Docker image can be created using the source files, and the following commands:

```bash
docker build -t vampaerr/simple-node .
```

To run the image:

```bash
docker run -p 49160:8080 -d vampaerr/simple-node
```

## Deploy

Create a namespace:

```bash
kubectl create namespace simple-node
```

Deploy to Kubernetes cluster using the simple-deployment.yaml, and simple-secrets.yaml which contains definitions for the service, deployment objects, and secrets:

```bash
kubectl apply -f simple-secrets.yaml
kubectl apply -f simple-deployment.yaml
```

Exposing the service using NodePort:

```bash
kubectl expose deployment simple-node-app --type=NodePort --name=simple-service -n simple-node
```

Check the port assigned to the app:

```bash
kubectl describe services simple-service -n simple-node
```

Getting pod details:

```bash
kubectl get pods --output=wide -n simple-node
```

To purge the cluster and containers, simply delete the namespace:

```bash
kubectl delete namespace simple-node
```
