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

    @Column({ name: 'source_id' })
    idSource: string;

    @Column({ name: 'target_id' })
    idTarget: string;

    @Column({ name: 'hastag' })
    hastag: string;

    @ManyToOne(() => ContactEntity, (contact) => contact.referral)
    @JoinColumn({
        name: 'source_id',
    })
    contact: ContactEntity;
}
