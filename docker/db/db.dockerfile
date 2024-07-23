FROM postgres:16.3

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
