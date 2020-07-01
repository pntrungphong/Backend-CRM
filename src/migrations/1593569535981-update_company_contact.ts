import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateCompanyContact1593569535981 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        ALTER TABLE company_contact
        ADD COLUMN title varchar(200) 
    `);

        await queryRunner.query(`
        ALTER TABLE company_contact
        RENAME COLUMN id_contact TO contact_id;
        ALTER TABLE company_contact
        RENAME COLUMN id_company TO company_id;

        ALTER TABLE contact_referral
        RENAME COLUMN id_source TO source_id;
        ALTER TABLE contact_referral
        RENAME COLUMN id_target TO target_id;

        ALTER TABLE tag_company
        RENAME COLUMN id_company TO company_id;
        ALTER TABLE tag_contact
        RENAME COLUMN id_contact TO contact_id; 
    `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(' SELECT * FROM "users" ');
    }
}
