### Setup this repo to start development

-   Run `make bootstrap` (for the first time setup)
-   Run `make up` to start docker container & start dev.
-   Happy coding :tada:

### To write new migrate

-   Run `yarn migration:create NewMigrationName` to create new migration file.
-   Run `make db-migrate` to run all migration.
-   Run `make db-revert` to revert 1 version right before.
