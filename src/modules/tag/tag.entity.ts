import {
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';

import { CompanyEntity } from '../company/company.entity';
import { ContactEntity } from '../contact/contact.entity';

@Entity({ name: 'tag' })
export class TagEntity {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column({ name: 'tag' })
    tag: string;

    @ManyToMany(() => CompanyEntity, { cascade: true })
    @JoinTable({
        name: 'tag_source',
        joinColumn: { name: 'tag_id' },
        inverseJoinColumn: { name: 'source_id' },
    })
    company: CompanyEntity[];

    @ManyToMany(() => ContactEntity, { cascade: true })
    @JoinTable({
        name: 'tag_source',
        joinColumn: { name: 'tag_id' },
        inverseJoinColumn: { name: 'source_id' },
    })
    contact: ContactEntity[];
}
