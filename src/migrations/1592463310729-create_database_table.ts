import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateDatabase1592463310729 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
          CREATE TABLE "contact" (
            "id" SERIAL PRIMARY KEY,
            "name" varchar(200) NOT NULL,
            "phone" varchar(15) ,
            "email" varchar(250) ,
            "address" varchar(250) ,
            "website" varchar(250) ,
            "create_by" varchar(200) NOT NULL,
            "update_by" varchar(200) NOT NULL,
            "delete_by" varchar(200) ,
            "create_at" timestampz NOT NULL DEFAULT now(),
            "update_at" timestampz NOT NULL DEFAULT now(),
            "delete_at" timestampz  
          );
          
          CREATE TABLE "company" (
            "id" SERIAL PRIMARY KEY,
            "name" varchar(200) NOT NULL,
            "address" varchar(250) ,
            "email" varchar(250) ,
            "phone" varchar(15) ,
            "website" varchar(250) ,
            "url" varchar(250) ,
            "create_by" varchar(200) NOT NULL,
            "update_by" varchar(200) NOT NULL,
            "delete_by" varchar(200) ,
            "create_at" timestampz NOT NULL DEFAULT now(),
            "update_at" timestampz NOT NULL DEFAULT now(),
            "delete_at" timestampz
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
