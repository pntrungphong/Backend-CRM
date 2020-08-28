import { MigrationInterface, QueryRunner } from 'typeorm';

export class log1598615988570 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE TABLE "log" (
            "id" SERIAL PRIMARY KEY,
            "type" varchar(20),
            "entity_type" varchar(50),
            "entity_id" integer,
            "before_update" jsonb,
            "after_update" jsonb,
            "field_change" jsonb,
            "created_by" varchar(200),
            "created_at" timestamptz NOT NULL DEFAULT now()
          )
        `);
    }
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TABLE "log"');
    }
}
