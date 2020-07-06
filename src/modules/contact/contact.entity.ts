import { Column, Entity, JoinColumn, ManyToMany, OneToMany, JoinTable } from 'typeorm';

import { AbstractEntity } from '../../common/abstract.entity';
import { CompanyContactEntity } from '../company-contact/companyContact.entity';
import { LeadEntity } from '../lead/lead.entity';

import { TagEntity } from '../tag/tag.entity';
import { ContactDto } from './dto/ContactDto';
import { ContactReferralEntity } from './referral/referral.entity';

@Entity({ name: 'contact' })
export class ContactEntity extends AbstractEntity<ContactDto> {
    @Column({ nullable: false })
    name: string;

    @Column({ unique: true, nullable: true, type: 'jsonb' })
    email: string;

    @Column({ nullable: true, default: '' })
    title: string;

    @Column({ nullable: true, type: 'jsonb' })
    phone: string;

    @Column({ nullable: true, type: 'jsonb' })
    address: string;

    @Column({ nullable: false, type: 'jsonb' })
    website: string;

    @Column({ nullable: false, name: 'created_by' })
    createdBy: string;

    @Column({ nullable: false, name: 'updated_by' })
    updatedBy: string;

    @OneToMany(() => CompanyContactEntity, (cpt) => cpt.contact)
    @JoinColumn()
    company: CompanyContactEntity[];

    @OneToMany(() => ContactReferralEntity, (referral) => referral.contact)
    @JoinColumn()
    referral: ContactReferralEntity[];

    @ManyToMany(() => LeadEntity, (lead) => lead.contact)
    lead: LeadEntity[];
    @ManyToMany(() => TagEntity, { cascade: true, eager: true })
    @JoinTable({
        name: 'tag_source',
        joinColumn: { name: 'source_id' },
        inverseJoinColumn: { name: 'tag_id' },
    })
    tag: TagEntity[];

    dtoClass = ContactDto;
}
