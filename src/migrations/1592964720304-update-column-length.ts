import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateColumnLength1592964720304 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE company
            DROP COLUMN address ,
            DROP COLUMN email ,
            DROP COLUMN phone ,
            DROP COLUMN website, 
            ADD address  jsonb,
            ADD email jsonb,
            ADD phone jsonb,
            ADD website jsonb
        `);

        await queryRunner.query(`
            ALTER TABLE contact
            DROP COLUMN address ,
            DROP COLUMN email ,
            DROP COLUMN phone ,
            DROP COLUMN website, 
            ADD address  jsonb,
            ADD email jsonb,
            ADD phone jsonb,
            ADD website jsonb
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(' SELECT * FROM "users" ');
    }
}
