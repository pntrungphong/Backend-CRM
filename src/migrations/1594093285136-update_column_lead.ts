import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateColumnLead1594093285136 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        ALTER TABLE lead
        ADD description text
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(' SELECT * FROM "users" ');
    }
}
