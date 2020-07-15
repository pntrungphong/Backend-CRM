import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { AbstractEntity } from '../../../../common/abstract.entity';
import { TouchPointDto } from '../../dto/touchpoint/TouchPointDto';
import { LeadEntity } from '../Lead/lead.entity';
import { TaskEntity } from '../Task/task.entity';
import { TouchPointFileEntity } from '../Touchpoint_file/fileTouchPoint.entity';

@Entity({ name: 'touchpoint' })
export class TouchPointEntity extends AbstractEntity<TouchPointDto> {
    @Column({ nullable: false, name: 'order' })
    order: number;
    @Column({ nullable: false, name: 'goal' })
    goal: string;
    @Column({ nullable: false, name: 'status' })
    status: string;
    @Column({ name: 'note' })
    note: string;
    @Column({ name: 'meeting_date' })
    meetingDate: Date;
    @Column({
        nullable: true,
        name: 'created_by',
    })
    createdBy: string;
    @Column({
        nullable: true,
        name: 'updated_by',
    })
    updatedBy: string;

    @Column({ name: 'lead_id' })
    leadId: number;

    @ManyToOne(() => LeadEntity, (lead) => lead.touchpoint)
    @JoinColumn({
        name: 'lead_id',
    })
    lead: LeadEntity;
    @OneToMany(
        () => TouchPointFileEntity,
        (fileTouchPoint) => fileTouchPoint.touchpoint,
    )
    @JoinColumn()
    fileTouchPoint: TouchPointFileEntity[];

    @OneToMany(() => TaskEntity, (task) => task.touchPoint)
    @JoinColumn()
    task: TaskEntity[];

    dtoClass = TouchPointDto;
}
