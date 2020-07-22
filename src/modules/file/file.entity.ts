import {
    Column,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    OneToMany,
} from 'typeorm';

import { AbstractEntity } from '../../common/abstract.entity';
import { LeadEntity } from '../lead/entity/Lead/lead.entity';
import { TouchPointFileEntity } from '../lead/entity/Touchpoint_file/fileTouchPoint.entity';
import { FileDto } from './dto/fileDto';

@Entity({ name: 'file' })
export class FileEntity extends AbstractEntity<FileDto> {
    @Column({ nullable: true, name: 'original_name' })
    originalName: string;

    @Column({ nullable: true, name: 'path' })
    path: string;

    @Column({ nullable: true, name: 'type' })
    mimeType: string;

    @Column({ nullable: true, name: 'file_name' })
    filename: string;

    @Column({ nullable: true, name: 'destination' })
    destination: string;

    @Column({ nullable: true, name: 'meta' })
    meta: string;

    @Column({ nullable: false, name: 'created_by' })
    createdBy: string;

    @Column({ nullable: false, name: 'updated_by' })
    updatedBy: string;

    @ManyToMany(() => LeadEntity, { cascade: true })
    @JoinTable({
        name: 'lead_file',
        joinColumn: { name: 'file_id' },
        inverseJoinColumn: { name: 'lead_id' },
    })
    lead: LeadEntity[];
    @OneToMany(
        () => TouchPointFileEntity,
        (fileTouchPoint) => fileTouchPoint.touchPoint,
    )
    @JoinColumn()
    fileTouchPoint: TouchPointFileEntity[];

    dtoClass = FileDto;
}
