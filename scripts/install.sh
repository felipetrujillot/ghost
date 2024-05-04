#!/bin/bash

echo "-------------"
echo "ghost"
echo "-------------"

apt update -y 
apt install -y curl wget git nginx php unzip php-curl php-mysqli php-simplexml

echo "Node 20"

curl -fsSL https://deb.nodesource.com/setup_20.x | bash - &&\
apt-get install -y nodejs

npm install pm2 -g

git config --global user.email "trujillo.felipe1997@gmail.com"
git config --global user.name "Felipe"
git config --global pull.rebase false 

echo "composer"

php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
php -r "if (hash_file('sha384', 'composer-setup.php') === 'dac665fdc30fdd8ec78b38b9800061b4150413ff2e3b6f88543c636f7cd84f6db9189d43a81e5503cda447da73c7e5b6') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;"
php composer-setup.php
php -r "unlink('composer-setup.php');"
mv composer.phar /usr/local/bin/composer

cd /var/wwww
composer create-project phpmyadmin/phpmyadmin
