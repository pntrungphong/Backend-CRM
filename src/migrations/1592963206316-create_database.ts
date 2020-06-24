import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateDatabase1592963206316 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`          
          CREATE TABLE "contact" (
            "id" SERIAL PRIMARY KEY,
            "name" varchar(200),
            "phone" varchar(500),
            "email" varchar(500),
            "address" varchar(1000),
            "website" varchar(500),
            "created_by" varchar(200),
            "updated_by" varchar(200),
            "created_at" timestamp,
            "updated_at" timestamp
          );
          
          CREATE TABLE "company" (
            "id" SERIAL PRIMARY KEY,
            "name" varchar(200),
            "address" varchar(1000),
            "email" varchar(500),
            "phone" varchar(500),
            "website" varchar(500),
            "url" varchar(500),
            "created_by" varchar(200),
            "updated_by" varchar(200),
            "created_at" timestamp,
            "updated_at" timestamp
          );
          
          CREATE TABLE "company_contact" (
            "id" SERIAL PRIMARY KEY,
            "id_contact" integer,
            "id_company" integer,
            "status" boolean
          );
          
          CREATE TABLE "tagCompany" (
            "id" SERIAL PRIMARY KEY,
            "tag" varchar(500),
            "id_company" integer
          );
          
          CREATE TABLE "tagContact" (
            "id" SERIAL PRIMARY KEY,
            "tag" varchar(500),
            "id_contact" integer
          );
          
          CREATE TABLE "contact_referral" (
            "id" SERIAL PRIMARY KEY,
            "id_source" integer,
            "id_target" integer
          );
          
          ALTER TABLE "company_contact" ADD FOREIGN KEY ("id_contact") REFERENCES "contact" ("id");
          
          ALTER TABLE "company_contact" ADD FOREIGN KEY ("id_company") REFERENCES "company" ("id");
          
          ALTER TABLE "contact_referral" ADD FOREIGN KEY ("id_source") REFERENCES "contact" ("id");
          
          ALTER TABLE "contact_referral" ADD FOREIGN KEY ("id_target") REFERENCES "contact" ("id");
          
          ALTER TABLE "tagContact" ADD FOREIGN KEY ("id_contact") REFERENCES "contact" ("id");
          
          ALTER TABLE "tagCompany" ADD FOREIGN KEY ("id_company") REFERENCES "company" ("id");
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('DROP TABLE "company"');
        await queryRunner.query('DROP TABLE "contact"');
        await queryRunner.query('DROP TABLE "tagCompany"');
        await queryRunner.query('DROP TABLE "tagContact"');
        await queryRunner.query('DROP TABLE "company_contact"');
        await queryRunner.query('DROP TABLE "contact_referral"');
    }
}
