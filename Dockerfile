FROM ubuntu:20.04

ENV DEBIAN_FRONTEND=noninteractive
ENV PYTHONUNBUFFERED=1

WORKDIR /var/www/submission

# initialize
RUN apt-get update && apt-get -y upgrade && apt-get -y dist-upgrade && apt-get -y autoremove && apt-get clean
RUN apt-get install -y python2 python3.8 python3-pip git-all curl --fix-missing

# pip
WORKDIR /var/www/submission
RUN pip3 install django-cors-headers
COPY requirements.txt /var/www/submission/
RUN pip3 install -r requirements.txt

# postgresql db
# RUN apt install -y python3-psycopg2
RUN pip3 install psycopg2-binary

# eureka

# kafka

# playwright
# RUN playwright install

WORKDIR /var/www/submission
COPY . /var/www/submission/