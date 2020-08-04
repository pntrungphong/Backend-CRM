import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateTouchpoint1596513858634 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        ALTER TABLE touchpoint
        ADD lane varchar(10) NOT NULL,
        ALTER TABLE lead
        ADD  on_hov integer
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        ALTER TABLE touchpoint
        DROP COLUMN lane;
        `);
        await queryRunner.query(`
        ALTER TABLE lead
        DROP COLUMN on_hov;
        `);
    }
}
