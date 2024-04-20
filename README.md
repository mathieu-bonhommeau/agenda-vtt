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

1 - `npm` for install dependencies

2 - `cp env.template .env` copy .env file

3 - The project can run with in memory data (and without the backend connection) or with classical http requests for retrieve data :
- in memory : change the value of REACT_APP variable to "dev"
- http : change the value of REACT_APP variable to "prod"

4 - `npm run dev` run the app in dev mode

Have fun ! 

