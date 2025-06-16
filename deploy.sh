REGISTRY=docker_registry_host
APP=calc-be
TAG=v1

docker build --platform linux/amd64 -t $APP:$TAG .
docker tag $APP:$TAG $REGISTRY/$APP:$TAG
docker push $REGISTRY/$APP:$TAG
