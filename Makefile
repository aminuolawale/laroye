LIGHTSAIL_STATIC_IP:=3.124.140.45
LIGHTSAIL_KEY_PATH:= ./key.pem
LIGHTSAIL_HOST:=ubuntu
.PHONY: all

startproject:
	sudo docker-compose run backend django-admin startproject laroye .
start:
	docker-compose up
build-and-start:
	docker-compose up --build

startapp:
	docker-compose run backend python manage.py startapp $(app)

superuser:
	docker-compose run backend python manage.py createsuperuser

migrations:
	docker-compose run backend python manage.py makemigrations

migrate:
	docker-compose run backend python manage.py migrate

db:
	docker-compose exec db /bin/bash
	
backend:
	docker-compose exec backend /bin/bash

key-access:
	sudo chmod 600 $(LIGHTSAIL_KEY_PATH)

ssh-lightsail:
	ssh -i $(LIGHTSAIL_KEY_PATH) $(LIGHTSAIL_HOST)@$(LIGHTSAIL_STATIC_IP)
