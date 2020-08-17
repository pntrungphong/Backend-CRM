import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateTableNote1597173556912 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "notes"
            ALTER "content" TYPE text,
            ALTER "content" DROP DEFAULT,
            ALTER "content" DROP NOT NULL;
            COMMENT ON COLUMN "notes"."content" IS '';
            COMMENT ON TABLE "notes" IS '';
        `);
    }
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE notes
            DROP COLUMN content;
        `);
    }
}
