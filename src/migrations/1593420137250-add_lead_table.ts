import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddLeadTable1593420137250 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE TABLE "lead" (
            "id" SERIAL PRIMARY KEY,
            "name" varchar(200) NOT NULL ,
            "id_company" integer ,
            "id_contact" integer ,
            "notes" text,
            "rank" integer,
            "status" varchar(30),
            "created_by" varchar(200) NOT NULL,
            "updated_by" varchar(200) NOT NULL,
            "created_at" timestamptz NOT NULL DEFAULT now(),
            "updated_at" timestamptz NOT NULL DEFAULT now()
          );
          
          CREATE TABLE "contact_lead" (
            "id_contact" integer,
            "id_lead" integer
          );
          
          ALTER TABLE "lead" ADD FOREIGN KEY ("id_company") REFERENCES "company" ("id");
          ALTER TABLE "contact_lead" ADD FOREIGN KEY ("id_contact") REFERENCES "contact" ("id");
          ALTER TABLE "contact_lead" ADD FOREIGN KEY ("id_lead") REFERENCES "lead" ("id");
          
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TABLE "lead"');
        await queryRunner.query('DROP TABLE "contact_lead"');
    }
}
