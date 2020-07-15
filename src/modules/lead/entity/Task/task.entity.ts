import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';

import { AbstractEntity } from '../../../../common/abstract.entity';
import { UserEntity } from '../../../user/user.entity';
import { TaskDto } from '../../dto/task/TaskDto';
import { LeadEntity } from '../Lead/lead.entity';
import { TouchPointEntity } from '../Touchpoint/touchpoint.entity';

@Entity({ name: 'task' })
export class TaskEntity extends AbstractEntity<TaskDto> {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'taskname' })
    taskname: string;

    @Column({ name: 'type' })
    type: string;

    @Column({ name: 'user_id' })
    userId: string;

    @Column({ name: 'touchpoint_id' })
    touchPointId: string;

    @Column({ name: 'due_date' })
    dueDate: Date;

    @Column({ nullable: false, name: 'created_by' })
    createdBy: string;

    @Column({ nullable: false, name: 'updated_by' })
    updatedBy: string;

    @ManyToOne(() => TouchPointEntity, (touchPoint) => touchPoint.task)
    @JoinColumn({
        name: 'touchpoint_id',
    })
    touchPoint: LeadEntity;

    @ManyToOne(() => UserEntity, (user) => user.task)
    @JoinColumn({
        name: 'user_id',
    })
    user: UserEntity;

    dtoClass = TaskDto;
}
