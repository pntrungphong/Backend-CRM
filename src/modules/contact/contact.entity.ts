import { Column, Entity, JoinColumn, OneToMany } from 'typeorm';

import { AbstractEntity } from '../../common/abstract.entity';
import { CompanyContactEntity } from '../companyContact/companyContact.entity';
import { ContactDto } from './dto/ContactDto';

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
    cpt: CompanyContactEntity[];

    dtoClass = ContactDto;
}
