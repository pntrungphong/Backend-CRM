import {
    Column,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
} from 'typeorm';

import { AbstractEntity } from '../../../common/abstract.entity';
import { CompanyEntity } from '../../client/entity/company.entity';
import { ContactEntity } from '../../client/entity/contact.entity';
import { FileEntity } from '../../file/file.entity';
import { TagEntity } from '../../tag/tag.entity';
import { LeadDto } from '../dto/LeadDto';
import { NoteEntity } from './note.entity';
@Entity({ name: 'lead' })
export class LeadEntity extends AbstractEntity<LeadDto> {
    @Column({ nullable: false })
    name: string;
    @Column({ nullable: false })
    rank: string;
    @Column({ nullable: false })
    status: string;
    @Column({ nullable: true })
    description: string;
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



    

    @ManyToMany(() => ContactEntity)
    @JoinTable({
        name: 'relatedto_lead',
        joinColumns: [{ name: 'lead_id' }],
        inverseJoinColumns: [{ name: 'relatedto_id' }],
    })
    relatedTo: ContactEntity[];



    @ManyToMany(() => TagEntity, { cascade: true, eager: true })
    @JoinTable({
        name: 'tag_source',
        joinColumn: { name: 'source_id' },
        inverseJoinColumn: { name: 'tag_id' },
    })
    tag: TagEntity[];

    @ManyToMany(() => FileEntity, { cascade: true })
    @JoinTable({
        name: 'lead_file',
        joinColumn: { name: 'lead_id' },
        inverseJoinColumn: { name: 'file_id' },
    })
    file: FileEntity[];

    dtoClass = LeadDto;
}
