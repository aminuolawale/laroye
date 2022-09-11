#/bin/bash

cd apps/laroye
git checkout develop
git pull origin
sudo docker-compose down
sudo docker-compose up --build 