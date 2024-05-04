#!/bin/bash

echo "-------------"
echo "ghost"
echo "This script will install everything for you."
echo "-------------"

apt update -y 
apt install -y curl wget git nginx

echo "Node 20"

curl -fsSL https://deb.nodesource.com/setup_20.x | bash - &&\
apt-get install -y nodejs

npm install pm2 -g

git config --global user.email "trujillo.felipe1997@gmail.com"
git config --global user.name "Felipe"
git config --global pull.rebase false 