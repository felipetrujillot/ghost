#!/bin/bash

file_name="ghost.conf"

file_content='server {

    charset utf-8;
    server_name felipetrujillo.cl;

    gzip on;
    gzip_disable "msie6";
    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_buffers 16 8k;
    gzip_http_version 1.1;
    gzip_min_length 256;

    gzip_types
    application/atom+xml
    application/geo+json
    application/javascript
    application/x-javascript
    application/json
    application/ld+json
    application/manifest+json
    application/rdf+xml
    application/rss+xml
    application/xhtml+xml
    application/xml
    font/eot
    font/otf
    font/ttf
    image/svg+xml
    text/css
    text/javascript
    text/plain
    text/xml;

    location / {
        proxy_pass http://localhost:4000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    error_log  /var/log/nginx/wl-error.log;
    access_log /var/log/nginx/wl.log;
}'

if [ -e "/etc/nginx/sites-available/$file_name" ]; then
    echo "File already exists."
    exit 1
fi

# Create the file and add content
echo "$file_content" | sudo tee "/etc/nginx/sites-available/$file_name" > /dev/null

#
ln -s "/etc/nginx/sites-available/$file_name" "/etc/nginx/sites-enabled/$file_name" 


systemctl restart nginx
