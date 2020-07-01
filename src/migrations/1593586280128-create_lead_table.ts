import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateLeadTable1593586280128 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE TABLE "lead" (
            "id" SERIAL PRIMARY KEY,
            "name" varchar(200),
            "company_id" integer,
            "rank" integer,
            "status" varchar(200),
            "created_by" varchar(200),
            "updated_by" varchar(200),
            "created_at" timestamp,
            "updated_at" timestamp
          );
          
          CREATE TABLE "notes" (
            "id" SERIAL PRIMARY KEY,
            "title" varchar(50),
            "content" varchar(500),
            "lead_id" integer
          );
          
          CREATE TABLE "contact_lead" (
            "lead_id" integer,
            "contact_id" integer
          );
          
          ALTER TABLE "lead" ADD FOREIGN KEY ("company_id") REFERENCES "company" ("id");
          
          ALTER TABLE "notes" ADD FOREIGN KEY ("lead_id") REFERENCES "lead" ("id");
          
          ALTER TABLE "contact_lead" ADD FOREIGN KEY ("lead_id") REFERENCES "lead" ("id");
          
          ALTER TABLE "contact_lead" ADD FOREIGN KEY ("contact_id") REFERENCES "contact" ("id");
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TABLE "lead"');
        await queryRunner.query('DROP TABLE "notes"');
        await queryRunner.query('DROP TABLE "contact_lead"');
    }
}
