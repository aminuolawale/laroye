LIGHTSAIL_STATIC_IP:=3.124.140.45
LIGHTSAIL_KEY_PATH:= ./key.pem
LIGHTSAIL_HOST:=ubuntu
startproject:
	sudo docker-compose run web django-admin startproject laroye .
start:
	docker-compose up
build-and-start:
	docker-compose up --build

startapp:
	docker-compose run web python manage.py startapp $(app)

superuser:
	docker-compose run web python manage.py createsuperuser

migrations:
	docker-compose run web python manage.py makemigrations

migrate:
	docker-compose run web python manage.py migrate

db:
	docker-compose exec db /bin/bash
	
backend:
	docker-compose exec backend /bin/bash

key-access:
	sudo chmod 600 $(LIGHTSAIL_KEY_PATH)

ssh-lightsail:
	ssh -i $(LIGHTSAIL_KEY_PATH) $(LIGHTSAIL_HOST)@$(LIGHTSAIL_STATIC_IP)