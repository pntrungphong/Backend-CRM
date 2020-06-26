import { Column, Entity, JoinColumn, OneToMany } from 'typeorm';

import { AbstractEntity } from '../../common/abstract.entity';
import { CompanyContactEntity } from '../company-contact/companyContact.entity';
import { CompanyDto } from './dto/CompanyDto';
import { TagCompanyEntity } from './tagcompany.entity';

@Entity({ name: 'company' })
export class CompanyEntity extends AbstractEntity<CompanyDto> {
    @Column({ nullable: false })
    name: string;
    @Column({ nullable: false })
    url: string;
    @Column({ nullable: true, type: 'jsonb' })
    address: string;
    @Column({ nullable: true, type: 'jsonb' })
    email: string;
    @Column({ nullable: true, type: 'jsonb' })
    phone: string;
    @Column({ nullable: true, type: 'jsonb' })
    website: string;
    @Column({
        nullable: true,
        name: 'created_by',
    })
    createdBy: string;
    @Column({
        nullable: true,
        name: 'updated_by',
    })
    updatedBy: string;

    @OneToMany(() => CompanyContactEntity, (cpt) => cpt.company)
    @JoinColumn()
    cpt: CompanyContactEntity[];

    @OneToMany(() => TagCompanyEntity, (tagCompany) => tagCompany.company)
    @JoinColumn()
    tagCompany: TagCompanyEntity[];

    dtoClass = CompanyDto;
}
