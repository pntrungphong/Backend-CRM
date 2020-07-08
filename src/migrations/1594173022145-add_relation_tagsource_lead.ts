import {MigrationInterface, QueryRunner} from "typeorm";

export class addRelationTagsourceLead1594173022145 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE TABLE "tag_lead" (
            "id" SERIAL PRIMARY KEY,
            "tag_id" integer,
            "lead_id" integer,
            "source_type" varchar(20)
          );
          ALTER TABLE "tag_lead" ADD FOREIGN KEY ("tag_id") REFERENCES "tag" ("id");
          ALTER TABLE "tag_lead" ADD FOREIGN KEY ("lead_id") REFERENCES "lead" ("id")
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(' SELECT * FROM "users" ');
    }

}
