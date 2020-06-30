
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

    @Column({ name: 'id_contact' })
    idContact: string;

    @Column({ name: 'tag' })
    tag: string;

    @ManyToOne(() => ContactEntity, (contact) => contact.tag)
    @JoinColumn({
        name: 'id_contact',
    })
    contact: ContactEntity;
}
