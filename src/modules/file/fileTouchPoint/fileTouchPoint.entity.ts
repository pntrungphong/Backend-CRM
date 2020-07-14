import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';

import { TouchPointEntity } from '../../touchpoint/touchpoint.entity';
import { FileEntity } from '../file.entity';

@Entity({ name: 'touchpoint_file' })
export class TouchPointFileEntity {
    @PrimaryGeneratedColumn('uuid')
    id: number;
    @Column({ name: 'touchpoint_id' })
    idTouchPoint: number;
    @Column({ name: 'file_id' })
    idFile: number;
    @Column({ name: 'lead_id' })
    idLead: number;
    @Column({ name: 'type' })
    type: string;
    @Column({ name: 'note' })
    note: string;

    @ManyToOne(
        () => TouchPointEntity,
        (touchpoint) => touchpoint.fileTouchPoint,
        {
            onDelete: 'NO ACTION',
            onUpdate: 'NO ACTION',
        },
    )
    @JoinColumn({
        name: 'touchpoint_id',
    })
    touchpoint: TouchPointEntity;

    @ManyToOne(() => FileEntity, (file) => file.fileTouchPoint, {
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
    })
    @JoinColumn({
        name: 'file_id',
    })
    file: FileEntity;
}
