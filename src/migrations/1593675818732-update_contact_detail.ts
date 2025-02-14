import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateContactDetail1593675818732 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        ALTER TABLE contact
        ADD COLUMN title varchar(200);
    `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(' SELECT * FROM "users" ');
    }
}
