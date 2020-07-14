import { AbstractRepository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';

import { UserEntity } from '../../../user/user.entity';
import { TaskDto } from '../../dto/task/TaskDto';
import { TaskEntity } from '../../entity/Task/task.entity';
@EntityRepository(TaskEntity)
export class TaskRepository extends AbstractRepository<TaskEntity> {
    public async create(
        user: UserEntity,
        createTaskDto: TaskDto[],
        touchPointId: string,
    ): Promise<void> {
        for await (const task of createTaskDto) {
            const taskObj = { ...task, touchPointId };
            const newtask = this.repository.create({
                ...taskObj,
                createdBy: user.id,
                updatedBy: user.id,
            });

            await this.repository.save(newtask);
        }
    }
}
