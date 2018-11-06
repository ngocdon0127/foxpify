FROM nginx:alpine
COPY index.html /usr/share/nginx/html/
COPY foxpify.js /usr/share/nginx/html/