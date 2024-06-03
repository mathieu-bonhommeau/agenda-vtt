FROM nginx:1.25-alpine

EXPOSE 80

WORKDIR /



COPY --link ./docker/client/default.conf /etc/nginx/conf.d/default.conf
COPY --link ./docker/client/htpasswd /etc/nginx/htpasswd
COPY --link ./client/out /usr/share/nginx/html


