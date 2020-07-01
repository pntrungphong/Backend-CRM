import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';

import { CompanyEntity } from '../company/company.entity';
import { ContactEntity } from '../contact/contact.entity';

@Entity({ name: 'company_contact' })
export class CompanyContactEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({ name: 'company_id' })
    idCompany: string;
    @Column({ name: 'contact_id' })
    idContact: string;

    @ManyToOne(() => CompanyEntity, (company) => company.cpt, {
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
    })
    @JoinColumn({
        name: 'company_id',
    })
    company: CompanyEntity;

    @ManyToOne(() => ContactEntity, (contact) => contact.company, {
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
    })
    @JoinColumn({
        name: 'contact_id',
    })
    contact: ContactEntity;
}
