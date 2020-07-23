import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';

import { FileEntity } from '../../../file/file.entity';
import { TouchPointEntity } from '../Touchpoint/touchpoint.entity';

@Entity({ name: 'touchpoint_file' })
export class TouchPointFileEntity {
    @PrimaryGeneratedColumn('uuid')
    id: number;
    @Column({ name: 'touchpoint_id' })
    touchPointId: number;
    @Column({ name: 'file_id' })
    fileId: number;
    @Column({ name: 'lead_id' })
    leadId: number;
    @Column({ name: 'type' })
    type: string;
    @Column({ name: 'note' })
    note: string;

    @ManyToOne(
        () => TouchPointEntity,
        (touchPoint) => touchPoint.fileTouchPoint,
        {
            onDelete: 'NO ACTION',
            onUpdate: 'NO ACTION',
        },
    )
    @JoinColumn({
        name: 'touchpoint_id',
    })
    touchPoint: TouchPointEntity;

    @ManyToOne(() => FileEntity, (file) => file.fileTouchPoint, {
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
    })
    @JoinColumn({
        name: 'file_id',
    })
    file: FileEntity;
}
