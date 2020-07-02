import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateTagTable1593676046106 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        DROP TABLE tag_company;
        DROP TABLE tag_contact;

        CREATE TABLE "tag" (
            "id" SERIAL PRIMARY KEY,
            "tag" varchar(200),
            "created_at" timestamptz NOT NULL DEFAULT now(),
            "updated_at" timestamptz NOT NULL DEFAULT now(),
            "deleted_at" timestamptz
          );
          
          CREATE TABLE "tag_source" (
            "id" SERIAL PRIMARY KEY,
            "tag_id" integer,
            "source_id" integer,
            "source_type" varchar(20),
            "created_at" timestamptz NOT NULL DEFAULT now(),
            "updated_at" timestamptz NOT NULL DEFAULT now(),
            "deleted_at" timestamptz    
          );
          
          ALTER TABLE "tag_source" ADD FOREIGN KEY ("tag_id") REFERENCES "tag" ("id");
    `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(' SELECT * FROM "tag" ');
    }
}
