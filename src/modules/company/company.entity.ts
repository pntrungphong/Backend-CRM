import {
    Column,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    OneToMany,
} from 'typeorm';

import { AbstractEntity } from '../../common/abstract.entity';
import { CompanyContactEntity } from '../company-contact/companyContact.entity';
import { LeadEntity } from '../lead/lead.entity';
import { TagEntity } from '../tag/tag.entity';
import { CompanyDto } from './dto/CompanyDto';

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
    contact: CompanyContactEntity[];

    @OneToMany(() => LeadEntity, (lead) => lead.company)
    @JoinColumn()
    lead: LeadEntity[];
    @ManyToMany(() => TagEntity, { cascade: true, eager: true })
    @JoinTable({
        name: 'tag_source',
        joinColumn: { name: 'source_id' },
        inverseJoinColumn: { name: 'tag_id' },
    })
    tag: TagEntity[];

    dtoClass = CompanyDto;
}
