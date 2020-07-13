import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableTouchpoint1594631866950 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE TABLE "touchpoint" (
            "id" SERIAL PRIMARY KEY,
            "lead_id" integer,
            "status" varchar(50),
            "order" integer,
            "goal" text,
            "note" text,
            "meeting_date" timestamptz,
            "created_by" varchar(200),
            "updated_by" varchar(200),
            "created_at" timestamptz NOT NULL DEFAULT now(),
            "updated_at" timestamptz NOT NULL DEFAULT now(),
          );
          CREATE TABLE "task" (
            "id" SERIAL PRIMARY KEY,
            "touchpoint_id" integer,
            "taskname" varchar(100),
            "type" varchar(100),
            "user_id" integer,
            "due_date" timestamptz,
            "created_by" varchar(200),
            "updated_by" varchar(200),
            "created_at" timestamptz NOT NULL DEFAULT now(),
            "updated_at" timestamptz NOT NULL DEFAULT now(),
          );
          
          CREATE TABLE "touchpoint_file" (
            "id" SERIAL PRIMARY KEY,
            "touchpoint_id" integer,
            "file_id" integer,
            "lead_id" integer,
            "type" varchar(50),
            "note" text,
          );
          ALTER TABLE "task" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");
          ALTER TABLE "touchpoint" ADD FOREIGN KEY ("lead_id") REFERENCES "lead" ("id");
          ALTER TABLE "task" ADD FOREIGN KEY ("touchpoint_id") REFERENCES "touchpoint" ("id");
          ALTER TABLE "touchpoint_file" ADD FOREIGN KEY ("touchpoint_id") REFERENCES "touchpoint" ("id");
          ALTER TABLE "touchpoint_file" ADD FOREIGN KEY ("file_id") REFERENCES "file" ("id");
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TABLE "touchpoint"');
        await queryRunner.query('DROP TABLE "task"');
        await queryRunner.query('DROP TABLE "touchpoint_file"');
    }
}
