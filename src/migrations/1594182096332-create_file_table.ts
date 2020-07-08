import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateFileTable1594182096332 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE TABLE "file" (
            "id" SERIAL PRIMARY KEY,
            "original_name" varchar(200),
            "path" varchar(200),
            "type" varchar(50),
            "file_name" varchar(200),
            "destination" varchar(200),
            "lead_id" integer,
            "created_by" varchar(200),
            "updated_by" varchar(200),
            "created_at" timestamptz NOT NULL DEFAULT now(),
            "updated_at" timestamptz NOT NULL DEFAULT now(),
            "deleted_at" timestamptz
          );
          
          ALTER TABLE "file" ADD FOREIGN KEY ("lead_id") REFERENCES "lead" ("id");
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TABLE "file"');
    }
}
