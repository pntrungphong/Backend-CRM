import { Column, Entity, OneToMany, JoinColumn } from 'typeorm';

import { AbstractEntity } from '../../common/abstract.entity';
import { ContactDto } from './dto/ContactDto';
import { ContactReferralEntity } from './contactreferral.entity';

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

    @OneToMany(type => ContactReferralEntity, (contactReferral) => contactReferral.contact)
    @JoinColumn()
    contactReferral: ContactReferralEntity[];

    dtoClass = ContactDto;
}
