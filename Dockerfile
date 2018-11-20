FROM nginx:alpine
COPY index.html /usr/share/nginx/html/
COPY bundle.js /usr/share/nginx/html/foxpify.js
COPY iframe.html /usr/share/nginx/html/