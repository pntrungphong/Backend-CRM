import { MigrationInterface, QueryRunner } from 'typeorm';
export class CreateDatabaseTable1592530936900 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
          CREATE TABLE "contact" (
            "id" SERIAL PRIMARY KEY,
            "name" varchar(200) NOT NULL,
            "phone" varchar(500) ,
            "email" varchar(500) ,
            "address" varchar(1000) ,
            "website" varchar(500) ,
            "created_by" varchar(200) NOT NULL,
            "updated_by" varchar(200) NOT NULL,
            "deleted_by" varchar(200) ,
            "created_at" timestamptz NOT NULL DEFAULT now(),
            "updated_at" timestamptz NOT NULL DEFAULT now(),
            "deleted_at" timestamptz  
          );
          
          CREATE TABLE "company" (
            "id" SERIAL PRIMARY KEY,
            "name" varchar(200) NOT NULL,
            "address" varchar(1000) ,
            "email" varchar(500) ,
            "phone" varchar(500) ,
            "website" varchar(500) ,
            "url" varchar(500) ,
            "created_by" varchar(200) NOT NULL,
            "updated_by" varchar(200) NOT NULL,
            "deleted_by" varchar(200) ,
            "created_at" timestamptz NOT NULL DEFAULT now(),
            "updated_at" timestamptz NOT NULL DEFAULT now(),
            "deleted_at" timestamptz
          );
          
          CREATE TABLE "company_contact" (
            "id" SERIAL PRIMARY KEY,
            "id_contact" integer,
            "id_company" integer,
            "status" boolean DEFAULT true
          );
          
          CREATE TABLE "contact_referral" (
            "id" SERIAL PRIMARY KEY,
            "id_source" integer,
            "id_target" integer,
            "status" boolean DEFAULT true
          );
          
          ALTER TABLE "company_contact" ADD FOREIGN KEY ("id_contact") REFERENCES "contact" ("id");
          
          ALTER TABLE "company_contact" ADD FOREIGN KEY ("id_company") REFERENCES "company" ("id");
          
          ALTER TABLE "contact_referral" ADD FOREIGN KEY ("id_source") REFERENCES "contact" ("id");
          
          ALTER TABLE "contact_referral" ADD FOREIGN KEY ("id_target") REFERENCES "contact" ("id");
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('DROP TABLE "company"');
        await queryRunner.query('DROP TABLE "contact"');
        await queryRunner.query('DROP TABLE "company_contact"');
        await queryRunner.query('DROP TABLE "contact_referral"');
    }
}
