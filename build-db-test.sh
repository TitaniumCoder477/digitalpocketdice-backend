imageName=mongo:latest
containerName=digitalpocketdice-db-test

echo Delete old container...
docker rm -f $containerName

echo Run new container...
docker run -it -d -p 27018:27018 --net=bridge -v /media/dev/projects/github/digitalpocketdice-backend/db:/data/db --name $containerName $imageName
