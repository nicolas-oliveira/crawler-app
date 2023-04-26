build:
	docker compose build

up:
	docker compose up --build

down:
	docker compose down

start:
	docker compose start

stop:
	docker compose stop

sh:
	docker compose exec app bash