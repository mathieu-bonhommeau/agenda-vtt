FROM nginx:latest

COPY --link ./docker/reverse-proxy/conf.d/ /etc/nginx/conf.d/
COPY --link ./docker/reverse-proxy/certs/ /etc/ssl/certs/

EXPOSE 80 443