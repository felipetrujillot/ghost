cd /var/www/ghost

git checkout main
git pull

npm install
npm run build-sw

pm2 delete ghost
pm2 start ecosystem.config.cjs 

chown -R www-data:www-data /var/www 
