import {MigrationInterface, QueryRunner} from "typeorm";

export class additionalTable1594304043755 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`  
        CREATE TABLE "touchPoint" (
            "id" SERIAL PRIMARY KEY,
            "goal" jsonb,
            "rank" integer,
            "meetingDate" Date  ,
            "lead_id" integer,
            "created_by" varchar(200),
            "updated_by" varchar(200),
            "created_at" timestamptz NOT NULL DEFAULT now(),
            "updated_at" timestamptz NOT NULL DEFAULT now(),
            "deleted_at" timestamptz
          );
          
          CREATE TABLE "noteTouchPoint" (
            "id" SERIAL PRIMARY KEY,
            "title" varchar(200),
            "content" text,
            "touchPoint_id" integer
          );
          
          CREATE TABLE "task" (
            "id" SERIAL PRIMARY KEY,
            "name" varchar(200),
            "task" jsonb,
            "pic" varchar(200),
            "dueDate" timestamp,
            "touchPoint_id" integer
          );
          
          ALTER TABLE "noteTouchPoint" ADD FOREIGN KEY ("touchPoint_id") REFERENCES "touchPoint" ("id");
          
          ALTER TABLE "task" ADD FOREIGN KEY ("touchPoint_id") REFERENCES "touchPoint" ("id");
          
          ALTER TABLE "touchPoint" ADD FOREIGN KEY ("lead_id") REFERENCES "lead" ("id");
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('DROP TABLE "noteTouchPoint"');
        await queryRunner.query('DROP TABLE "task"');
        await queryRunner.query('DROP TABLE "touchPoint"');
    }

}
