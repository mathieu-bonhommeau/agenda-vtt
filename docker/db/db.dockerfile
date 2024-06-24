FROM postgres:16.3-alpine3.20

ARG POSTGRES_USER
ARG POSTGRES_PASSWORD
ARG POSTGRES_DB

ENV POSTGRES_USER=$POSTGRES_USER
ENV POSTGRES_PASSWORD=$POSTGRES_PASSWORD
ENV POSTGRES_DB=$POSTGRES_DB

EXPOSE 5432

COPY ./docker/db/postgresql.conf /etc/postgresql.conf
CMD ["postgres", "-c", "config_file=/etc/postgresql.conf"]
