import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateFileTable1597134693065 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        ALTER TABLE file
            ADD COLUMN  user_id uuid
        ;
        ALTER TABLE "file" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        ALTER TABLE file
        DROP COLUMN user_id;
        `);
    }
}
