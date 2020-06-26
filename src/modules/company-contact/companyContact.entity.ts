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
    @Column({ name: 'id_company' })
    companyId: string;
    @Column({ name: 'id_contact' })
    contactId: string;

    @ManyToOne(() => CompanyEntity, (company) => company.cpt, {
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
    })
    @JoinColumn({
        name: 'id_company',
    })
    company: CompanyEntity;

    @ManyToOne(() => ContactEntity, (contact) => contact.company, {
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
    })
    @JoinColumn({
        name: 'id_contact',
    })
    contact: ContactEntity;
}
