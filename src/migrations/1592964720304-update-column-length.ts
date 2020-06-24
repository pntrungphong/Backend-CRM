import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateColumnLength1592964720304 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE company
            ALTER COLUMN address TYPE varchar(1000),
            ALTER COLUMN email TYPE varchar(500),
            ALTER COLUMN phone TYPE varchar(500)
            ALTER COLUMN website TYPE varchar(500)
            ALTER COLUMN url TYPE varchar(500)
        `);

        await queryRunner.query(`
            ALTER TABLE contact
            ALTER COLUMN phone TYPE varchar(500),
            ALTER COLUMN email TYPE varchar(500),
            ALTER COLUMN address TYPE varchar(1000)
            ALTER COLUMN website TYPE varchar(500)
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(' SELECT * FROM "users" ');
    }
}
