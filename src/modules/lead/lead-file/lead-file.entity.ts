import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';

import { FileEntity } from '../../file/file.entity';
import { LeadEntity } from '../lead.entity';

@Entity({ name: 'lead_file' })
export class LeadFileEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({ name: 'lead_id' })
    idLead: string;
    @Column({ name: 'file_id' })
    idFile: string;

    @ManyToOne(() => LeadEntity, (lead) => lead.leadFile)
    @JoinColumn({
        name: 'lead_id',
    })
    lead: LeadEntity;

    @ManyToOne(() => FileEntity, (file) => file.leadFile)
    @JoinColumn({
        name: 'file_id',
    })
    file: Promise<FileEntity>;
}
