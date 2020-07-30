import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateFileTable1595988898006 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        ALTER TABLE file
        ADD url text
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE file
            DROP COLUMN url;
        `);
    }
}
