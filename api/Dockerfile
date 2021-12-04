FROM node:12
RUN npm i -g firebase-tools
RUN firebase --version
ADD . /src
WORKDIR /src/functions
RUN npm install
RUN echo 'deb http://ftp.debian.org/debian stretch-backports main' | tee /etc/apt/sources.list.d/stretch.backports.list
RUN apt-get update && \
  apt-get install -y openjdk-11-jre-headless && \
  apt-get clean;
EXPOSE 9099 4000 5001 8080 9199
