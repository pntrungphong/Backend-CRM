import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedinUser1592464716270 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`
            INSERT INTO "users" ("id", "created_at", "updated_at", "first_name", "last_name", "avatar", "role", "email", "password", "phone") 
            VALUES
            ('b6f0f679-4189-4d02-99d6-c960f238c9f7',	'2020-06-18 07:10:39.552488',	'2020-06-18 07:10:39.552488',	
            'ADmin','',	NULL,	'USER',	'admin@gu.io',	'$2b$10$/peOSUoM0gyF4vJjk/rT4uoSaGyr.NW/T.uqQHV4uCVkTwv0UOep6',	''),
            ('39d088f6-cc81-4263-ac27-b920983a4eb0',	'2020-06-18 07:11:45.3831',	    '2020-06-18 07:11:45.3831',	    
            'Nhan',	'',	NULL,	'USER',	'nhan.ld@gu.io',	'$2b$10$qPmkM8SQFx4wBsuHbkyqI.O1dEmiAI8O28il0XcRlkAyGJwxxDN8y',	''),
            ('48862ade-6f9a-471f-835a-cff4f3b9a567',	'2020-06-18 07:11:59.369909',	'2020-06-18 07:11:59.369909',	
            'Chau',	'',	NULL,	'USER',	'chau.cd@gu.io',	'$2b$10$SmrMnoa1UlHyiTGpHYUbAOtqPlnivycSamI4JslHiuWXcO8r1FxIe',	''),
            ('50b0cb2e-3782-4b11-82c0-4e2f6580ab94',	'2020-06-18 07:12:10.491438',	'2020-06-18 07:12:10.491438',	
            'Tu',	'',	NULL,	'USER',	'tu.tt@gu.io',	'$2b$10$gM/OR/.7epp8YW.oSFbubeMJ8Snyo52I/2CrRp3v7CWianjBHwWwG',	''),
            ('171ecb82-4daa-43dc-8fec-61878b42d506',	'2020-06-18 07:12:25.080748',	'2020-06-18 07:12:25.080748',	
            'Khoa',	'',	NULL,	'USER',	'khoa.nd@gu.io',	'$2b$10$SVhXe.EJzoxdK3AkruEIbeIjsnVjI2eONMWBMUQ06t0fwNXgjS6WK',	'');
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(' SELECT * FROM "users" ');
    }
}
