imageName=jwilmoth:digitalpocketdice-backend
containerName=digitalpocketdice-app-test

docker build -t $imageName -f Dockerfile ./app

echo Delete old container...
docker rm -f $containerName

echo Run new container...
docker run -d -p 8082:8082 --net=bridge -v /media/dev/projects/github/digitalpocketdice-backend/app:/media/dpd-backend/app --name $containerName $imageName
