FROM postgres:16.3

ARG POSTGRES_USER
ARG POSTGRES_PASSWORD
ARG POSTGRES_DB

ENV POSTGRES_USER=$POSTGRES_USER
ENV POSTGRES_PASSWORD=$POSTGRES_PASSWORD
ENV POSTGRES_DB=$POSTGRES_DB

RUN apt-get update && apt-get install -yq \
	wget \
    gcc

RUN wget http://download.osgeo.org/postgis/source/postgis-3.3.2.tar.gz
RUN tar -xvzf postgis-3.3.2.tar.gz

RUN apt-get install -yq libpq-dev libssl-dev
RUN apt-get install -yq libxml2-dev
RUN apt-get install -yq libgeos-dev
RUN apt-get install -yq libproj-dev
RUN apt-get install -yq autoconf
RUN apt-get install -yq libtool
RUN apt-get install -yq libstdc++6 libconfig++8
RUN apt-get install -yq protobuf-c-compiler protobuf-compiler libprotobuf-dev
RUN apt-get install -yq postgis postgresql-13-postgis-3

EXPOSE 5432

COPY ./docker/db/postgresql.conf /etc/postgresql.conf
CMD ["postgres", "-c", "config_file=/etc/postgresql.conf"]
