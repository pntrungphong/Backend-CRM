import {MigrationInterface, QueryRunner} from "typeorm";

export class updateLead1594953439435 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        ALTER TABLE lead
        ADD rank_revision jsonb
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TABLE "lead"');
    }

}
