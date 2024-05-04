cd /var/www/pos

git checkout main
git pull

npm install
npm run build

pm2 delete pos
pm2 start ecosystem.config.cjs 

chown -R www-data:www-data /var/www 
