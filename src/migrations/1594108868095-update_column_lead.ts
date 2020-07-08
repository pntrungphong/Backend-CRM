import {MigrationInterface, QueryRunner} from "typeorm";

export class updateColumnLead1594108868095 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        ALTER TABLE lead
        ADD brif character varying
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(' SELECT * FROM "users" ');
    }

}
