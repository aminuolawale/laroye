# syntax=docker/dockerfile:1
FROM python:3
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
RUN curl -sL https://deb.nodesource.com/setup_16.x -o /tmp/nodesource_setup.sh && bash /tmp/nodesource_setup.sh &&  apt install nodejs
WORKDIR /client
COPY ./client/package.json ./client/package-lock.json ./
RUN npm install
COPY ./client ./
WORKDIR /code
COPY  requirements.txt /code/
RUN pip install -r requirements.txt
COPY . /code/
CMD cd ./client && npm install react scripts && npm run build && cd .. && python manage.py runserver 0.0.0.0:8000