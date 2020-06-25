import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';

import { ContactEntity } from './contact.entity';

@Entity({ name: 'contact_referral' })
export class ContactReferralEntity {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column({ name: 'id_source' })
    idSource: string;

    @Column({ name: 'id_target' })
    idTarget: string;

    @Column({ name: 'hastag' })
    hastag: string;

    @ManyToOne(() => ContactEntity, (contact) => contact.contactReferral)
    @JoinColumn({
        name: 'id_source',
    })
    contact: ContactEntity;
}
