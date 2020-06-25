import { MigrationInterface, QueryRunner } from 'typeorm';

export class AdditionalTable1592963206316 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`  
          CREATE TABLE "tag_company" (
            "id" SERIAL PRIMARY KEY,
            "tag" varchar(500),
            "id_company" integer,
            "created_at" timestamptz NOT NULL DEFAULT now(),
            "updated_at" timestamptz NOT NULL DEFAULT now(),
            "deleted_at" timestamptz
          );
          
          CREATE TABLE "tag_contact" (
            "id" SERIAL PRIMARY KEY,
            "tag" varchar(500),
            "id_contact" integer,
            "created_at" timestamptz NOT NULL DEFAULT now(),
            "updated_at" timestamptz NOT NULL DEFAULT now(),
            "deleted_at" timestamptz    
          );
          
          ALTER TABLE "tag_contact" ADD FOREIGN KEY ("id_contact") REFERENCES "contact" ("id");
          ALTER TABLE "tag_company" ADD FOREIGN KEY ("id_company") REFERENCES "company" ("id");
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('DROP TABLE "tagCompany"');
        await queryRunner.query('DROP TABLE "tagContact"');
        await queryRunner.query('DROP TABLE "website"');
    }
}
