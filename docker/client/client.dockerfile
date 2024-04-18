FROM nginx:1.25-alpine

EXPOSE 80

WORKDIR /

COPY ./client/ .

CMD npm run start

