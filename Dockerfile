FROM ubuntu:20.04

LABEL maintainer="mojtaba.eshghi@ut.ac.ir"

# setting up the project for npm project 
COPY ./dev_framework /dev_framework
WORKDIR /test_framework

# installing latest nodejs version
RUN apt-get update
RUN apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_current.x | bash -
RUN apt-get install -y nodejs
RUN apt-get install -y build-essential
RUN npm install --save solc

# npm project setup
RUN npm init -y