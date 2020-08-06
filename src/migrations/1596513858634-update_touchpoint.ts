import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateTouchpoint1596513858634 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        ALTER TABLE touchpoint
        ADD COLUMN lane varchar(10)
        `);
        await queryRunner.query(`
        ALTER TABLE lead
        ADD COLUMN on_hov integer
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
