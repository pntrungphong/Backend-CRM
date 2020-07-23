import {MigrationInterface, QueryRunner} from "typeorm";

export class updateTouchpoint1595522760231 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        ALTER TABLE touchpoint
        ADD actual_date timestamptz
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TABLE "touchpoint"');
    }

}
