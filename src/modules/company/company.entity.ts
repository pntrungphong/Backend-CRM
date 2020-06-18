/* eslint-disable @typescript-eslint/no-unused-vars */
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { AbstractEntity } from '../../common/abstract.entity';
import { CompanyContactEntity } from '../company_contact/company_contact.entity';
import { CompanyDto } from './dto/CompanyDto';

@Entity({ name: 'company' })
export class CompanyEntity {
    @PrimaryGeneratedColumn()
    id: string;
    @Column({ nullable: true, type: 'varchar', length: 200 })
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

    @OneToMany((type) => CompanyContactEntity, (cpct) => cpct.cp, {
        cascade: true,
    })
    cpct: CompanyContactEntity[];
}
