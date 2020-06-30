
import { Column, Entity, JoinColumn, OneToMany } from 'typeorm';

import { AbstractEntity } from '../../common/abstract.entity';
import { CompanyContactEntity } from '../company-contact/companyContact.entity';
import { ContactReferralEntity } from './contactreferral.entity';
import { ContactDto } from './dto/ContactDto';
import { TagContactEntity } from './tagcontact.entity';

@Entity({ name: 'contact' })
export class ContactEntity extends AbstractEntity<ContactDto> {
    @Column({ nullable: false })
    name: string;

    @Column({ unique: true, nullable: true, type: 'jsonb' })
    email: string;

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

    @OneToMany(() => TagContactEntity, (tagContact) => tagContact.contact)
    @JoinColumn()
    tagContact: TagContactEntity[];

    dtoClass = ContactDto;
}
