'use strict';
import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Param,
    Post,
    Put,
    Query,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { AuthUser } from '../../../decorators/auth-user.decorator';
import { AuthGuard } from '../../../guards/auth.guard';
import { RolesGuard } from '../../../guards/roles.guard';
import { AuthUserInterceptor } from '../../../interceptors/auth-user-interceptor.service';
import { UserEntity } from '../../user/user.entity';
import { TaskDto } from '../dto/task/TaskDto';
import { UpdateTaskDto } from '../dto/task/UpdateTaskDto';
import { TaskEntity } from '../entity/Task/task.entity';
import { TaskService } from '../service/Task/task.service';

@Controller('task')
@ApiTags('task')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(AuthUserInterceptor)
@ApiBearerAuth()
export class TaskController {
    constructor(private _taskService: TaskService) {}

    @Post(':touchpointId')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({
        type: TaskDto,
        description: 'Successfully Created',
    })
    async createTask(
        @Param('touchpointId') touchpointId: string,
        @Body() data: UpdateTaskDto,
        @AuthUser() user: UserEntity,
    ): Promise<TaskEntity> {
        return this._taskService.create(user, data, touchpointId);
    }

    @Put(':taskId')
    @ApiOkResponse({
        type: TaskDto,
        description: 'Successfully Updated',
    })
    async update(
        @Query('touchPointId') touchPointId: string,
        @Param('taskId') taskId: string,
        @Body() updateDto: UpdateTaskDto,
        @AuthUser() user: UserEntity,
    ): Promise<TaskEntity> {
        return this._taskService.update(user, updateDto, touchPointId, taskId);
    }
}
