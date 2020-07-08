import {MigrationInterface, QueryRunner} from "typeorm";

export class updateColumnLead1594093285136 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        ALTER TABLE lead
        ADD description varchar(3000)
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(' SELECT * FROM "users" ');
    }

}
