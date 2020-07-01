import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateCompanyContact1593569535981 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        ALTER TABLE company_contact
        ADD COLUMN title varchar(200) 
    `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(' SELECT * FROM "users" ');
    }
}
