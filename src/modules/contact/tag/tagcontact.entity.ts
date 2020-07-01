import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';

import { ContactEntity } from '../contact.entity';

@Entity({ name: 'tag_contact' })
export class TagContactEntity {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column({ name: 'contact_id' })
    idContact: string;

    @Column({ name: 'tag' })
    tag: string;

    @ManyToOne(() => ContactEntity, (contact) => contact.tag)
    @JoinColumn({
        name: 'contact_id',
    })
    contact: ContactEntity;
}
