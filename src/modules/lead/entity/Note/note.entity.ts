import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';

import { LeadEntity } from '../Lead/lead.entity';

@Entity({ name: 'notes' })
export class NoteEntity {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column({ name: 'lead_id' })
    idLead: string;

    @Column({ name: 'title' })
    title: string;

    @Column({ name: 'content' })
    content: string;

    @ManyToOne(() => LeadEntity, (lead) => lead.note)
    @JoinColumn({
        name: 'lead_id',
    })
    lead: LeadEntity;
}
