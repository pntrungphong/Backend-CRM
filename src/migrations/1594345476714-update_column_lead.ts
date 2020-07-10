import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateColumnLead1594345476714 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE TABLE "relatedto_lead" (
            "lead_id" integer,
            "relatedto_id" integer
          );
        ALTER TABLE "relatedto_lead" ADD FOREIGN KEY ("lead_id") REFERENCES "lead" ("id");
        ALTER TABLE "relatedto_lead" ADD FOREIGN KEY ("relatedto_id") REFERENCES "contact" ("id");
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TABLE "relatedto_lead"');
    }
}
