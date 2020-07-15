import { AbstractRepository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';

import { UpdateTaskDto } from '../../../lead/dto/task/UpdateTaskDto';
import { UserEntity } from '../../../user/user.entity';
import { TaskEntity } from '../../entity/Task/task.entity';

@EntityRepository(TaskEntity)
export class TaskRepository extends AbstractRepository<TaskEntity> {
    public async create(
        user: UserEntity,
        createTaskDto: UpdateTaskDto,
        touchPointId: string,
    ): Promise<TaskEntity> {
        const taskEntity = this.repository.create({
            touchPointId,
            ...createTaskDto,
            createdBy: user.id,
            updatedBy: user.id,
        });
        const newTask = await this.repository.save(taskEntity);
        return newTask.toDto() as TaskEntity;
    }

    public async update(
        user: UserEntity,
        updateTaskDto: UpdateTaskDto,
        touchPointId: string,
        taskId: string,
    ): Promise<TaskEntity> {
        const updateTasks = await this.repository.find({ id: taskId });
        await this.repository.remove(updateTasks);

        return this.create(user, updateTaskDto, touchPointId);
    }
}
