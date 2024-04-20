FROM nginx:1.25-alpine

EXPOSE 80

WORKDIR /

COPY --link ./client/out /usr/share/nginx/html


