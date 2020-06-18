import {
    AfterUpdate,
    BeforeInsert,
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';

import { CompanyContactEntity } from '../company_contact/company_contact.entity';

@Entity({ name: 'company' })
export class CompanyEntity {
    @PrimaryGeneratedColumn()
    id: string;
    @Column({ nullable: false, type: 'varchar', length: 200 })
    name: string;
    @Column({ nullable: true, type: 'varchar', length: 250 })
    address: string;
    @Column({ nullable: true, type: 'varchar', length: 250 })
    email: string;
    @Column({ nullable: true, type: 'varchar', length: 15 })
    phone: string;
    @Column({ nullable: true, type: 'varchar', length: 250 })
    website: string;
    @Column({ nullable: true, type: 'varchar', length: 250 })
    url: string;
    @Column({ nullable: false, type: 'timestamptz' })
    createAt: Date;
    @Column({ nullable: false, type: 'timestamptz' })
    updateAt: Date;
    @OneToMany(() => CompanyContactEntity, (cpct) => cpct.cp, {
        cascade: true,
    })
    @BeforeInsert()
    updateDates(): void {
        this.createAt = new Date();
        this.updateAt = new Date();
    }
    @AfterUpdate()
    resetDates(): void {
        this.updateAt = new Date();
    }
    cpct: CompanyContactEntity[];
}
