import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateDatabase1592963206316 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`  
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
          
          ALTER TABLE "tagContact" ADD FOREIGN KEY ("id_contact") REFERENCES "contact" ("id");
          ALTER TABLE "tagCompany" ADD FOREIGN KEY ("id_company") REFERENCES "company" ("id");
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('DROP TABLE "tagCompany"');
        await queryRunner.query('DROP TABLE "tagContact"');
    }
}
