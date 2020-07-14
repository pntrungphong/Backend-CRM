import { Injectable } from '@nestjs/common';

import { UserEntity } from '../../../user/user.entity';
import { TaskDto } from '../../dto/task/TaskDto';
import { TaskRepository } from '../../repository/Task/task.repository';

@Injectable()
export class TaskService {
    constructor(public readonly taskRepository: TaskRepository) {}

    async create(
        user: UserEntity,
        createTaskDto: TaskDto[],
        touchPointId: string,
    ): Promise<void> {
        await this.taskRepository.create(user, createTaskDto, touchPointId);
    }

    // async update(tasks: TaskDto[], idLead: string): Promise<void> {
    //     await this.taskRepository.update(tasks, idLead);
    // }
}
