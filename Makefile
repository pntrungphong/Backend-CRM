alias = harmonia

default: up

bootstrap:
	make up
	make yarn-install
	make db-migrate
	echo "Happy coding!!! :tada:"

dev-up:
	npm run start:dev
up:
	docker-compose up -d --remove-orphans

down:
	docker-compose down

ps:
	docker-compose ps

yarn-install:
	yarn install

db-migrate:
	yarn migration:run

db-revert:
	yarn migration:revert

fork-kill-dev:
	lsof -t -i tcp:3000 | xargs kill