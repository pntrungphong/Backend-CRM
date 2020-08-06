import { Injectable } from '@nestjs/common';

import { UpdateTaskDto } from '../../../lead/dto/task/UpdateTaskDto';
import { TaskEntity } from '../../../lead/entity/Task/task.entity';
import { UserEntity } from '../../../user/user.entity';
import { TaskRepository } from '../../repository/Task/task.repository';
@Injectable()
export class TaskService {
    constructor(public readonly taskRepository: TaskRepository) {}

    async create(
        user: UserEntity,
        createDto: UpdateTaskDto,
        touchPointId: string,
    ): Promise<TaskEntity> {
        return this.taskRepository.create(user, createDto, touchPointId);
    }

    async remove(touchPointId: string): Promise<any> {
        return this.taskRepository.remove(touchPointId);
    }
}
