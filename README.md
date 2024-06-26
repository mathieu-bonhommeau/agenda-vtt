# UtagawaVTT Agenda

This project is a part of UtagawaVTT project.
It provides a map and a calendar with VTT events informed by the community. 

Each event has a geolocation, a start date, an end date and many other information.

A search feature with many filters is available for finding events.

## Getting started

To make it easy for you to get started with UtagawaVTT Agenda, here's a list of recommended next steps.

First, open a terminal and clone the repo

This project uses npm

## Frontend App

This app is built with NextJs and Typescript. 

For launch the project : 

1 - `cd client`

2 - `npm install` for install dependencies

3 - `cp env.template .env` copy .env file

4 - The project can run with in memory data (and without the backend connection) or with classical http requests for retrieve data :
- in memory : change the value of REACT_APP variable to "dev"
- http : change the value of REACT_APP variable to "prod"

5 - `npm run dev` run the app in dev mode

## API

This api is built with NestJs, Typescript and ad uses Posgresql database

1 - `cd api`

2 - `npm install` for install dependencies

3 - `cp env.template .env` copy .env file

// Add steps for migrations and fixtures

4 - The project can run with in memory data (and without the backend connection) or with classical http requests for retrieve data :
- in memory : change the value of REACT_APP variable to "dev"
- http : change the value of REACT_APP variable to "prod"

5 - `npm run dev` run the app in dev mode

## PRODUCTION

To launch the app in production, you have to use containers available on gitlab container registry. This is true for frontend, api and database

- frontend

```
docker run -p 80:80 registry.gitlab.com/utagawavtt/utagawavtt-agenda/client:production
```

- database
```
docker run --rm \
-e POSTGRES_USER=<POSTGRES_USER> \
-e POSTGRES_PASSWORD=<POSTGRES_PASSWORD> \
-e POSTGRES_DB=<POSTGRES_DB> \
-p <LOCAL_PORT>:5432 registry.gitlab.com/utagawavtt/utagawavtt-agenda/db:production
```

Have fun !

