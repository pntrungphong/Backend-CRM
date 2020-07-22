'use strict';

import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

import { AbstractDto } from '../../../../common/dto/AbstractDto';
import { TaskEntity } from '../../../lead/entity/Task/task.entity';
import { UserDto } from '../../../user/dto/UserDto';
export class TaskDto extends AbstractDto {
    @IsOptional()
    @ApiPropertyOptional()
    taskName: string;

    @IsOptional()
    @ApiPropertyOptional()
    type: string;

    @IsOptional()
    @ApiPropertyOptional()
    userId: string;

    @IsOptional()
    @ApiPropertyOptional()
    dueDate: Date;

    @ApiPropertyOptional({ type: [UserDto] })
    user: UserDto;
    constructor(task: TaskEntity) {
        super(task);
        this.taskName = task.taskName;
        this.type = task.type;
        this.userId = task.userId;
        this.dueDate = task.dueDate;
        this.user = task.user;
    }
}
