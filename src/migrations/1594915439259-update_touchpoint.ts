import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateTouchpoint1594915439259 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        ALTER TABLE touchpoint
        ADD review text
        `);
        await queryRunner.query(`
        ALTER TABLE lead
        ADD review text
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TABLE "touchpoint"');
        await queryRunner.query('DROP TABLE "lead"');
    }
}
