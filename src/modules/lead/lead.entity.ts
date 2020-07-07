import {
    Column,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
} from 'typeorm';

import { AbstractEntity } from '../../common/abstract.entity';
import { LeadDto } from './dto/LeadDto';
import { NoteEntity } from './note/note.entity';
import { CompanyEntity } from '../client/entity/company.entity';
import { ContactEntity } from '../client/entity/contact.entity';
@Entity({ name: 'lead' })
export class LeadEntity extends AbstractEntity<LeadDto> {
    @Column({ nullable: false })
    name: string;
    @Column({ nullable: false })
    rank: string;
    @Column({ nullable: false })
    status: string;
    @Column({ nullable: false, name: 'created_by' })
    createdBy: string;
    @Column({ nullable: false, name: 'updated_by' })
    updatedBy: string;
    @Column({ name: 'company_id' })
    idCompany: string;
    @ManyToOne(() => CompanyEntity, (company) => company.lead)
    @JoinColumn({
        name: 'company_id',
    })
    company: CompanyEntity;

    @OneToMany(() => NoteEntity, (note) => note.lead)
    @JoinColumn({
        name: 'lead_id',
    })
    note: NoteEntity[];

    @ManyToMany(() => ContactEntity)
    @JoinTable({
        name: 'contact_lead',
        joinColumns: [{ name: 'lead_id' }],
        inverseJoinColumns: [{ name: 'contact_id' }],
    })
    contact: ContactEntity[];

    dtoClass = LeadDto;
}
