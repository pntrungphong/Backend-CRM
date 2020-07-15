import { Column, Entity, JoinColumn, OneToMany } from 'typeorm';

import { AbstractEntity } from '../../common/abstract.entity';
import { RoleType } from '../../common/constants/role-type';
import { TaskEntity } from '../lead/entity/Task/task.entity';
import { UserDto } from './dto/UserDto';

@Entity({ name: 'users' })
export class UserEntity extends AbstractEntity<UserDto> {
    @Column({ nullable: true })
    firstName: string;

    @Column({ nullable: true })
    lastName: string;

    @Column({ type: 'enum', enum: RoleType, default: RoleType.USER })
    role: RoleType;

    @Column({ unique: true, nullable: true })
    email: string;

    @Column({ nullable: true })
    password: string;

    @Column({ nullable: true })
    phone: string;

    @Column({ nullable: true })
    avatar: string;

    @OneToMany(() => TaskEntity, (task) => task.user)
    @JoinColumn({
        name: 'user_id',
    })
    task: TaskEntity[];

    dtoClass = UserDto;
}
