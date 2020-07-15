'use strict';

import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

import { AbstractDto } from '../../../../common/dto/AbstractDto';
import { TaskEntity } from '../../../lead/entity/Task/task.entity';
export class TaskDto extends AbstractDto {
    @IsOptional()
    @ApiPropertyOptional()
    taskname: string;

    @IsOptional()
    @ApiPropertyOptional()
    type: string;

    @IsOptional()
    @ApiPropertyOptional()
    userId: string;

    @IsOptional()
    @ApiPropertyOptional()
    dueDate: Date;

    constructor(task: TaskEntity) {
        super(task);
        this.taskname = task.taskname;
        this.type = task.type;
        this.userId = task.userId;
        this.dueDate = task.dueDate;
    }
}
