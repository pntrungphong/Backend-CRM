'use strict';
import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Post,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { AuthUser } from '../../../decorators/auth-user.decorator';
import { AuthGuard } from '../../../guards/auth.guard';
import { RolesGuard } from '../../../guards/roles.guard';
import { AuthUserInterceptor } from '../../../interceptors/auth-user-interceptor.service';
import { UserEntity } from '../../../modules/user/user.entity';
import { TouchPointDto } from '../dto/touchpoint/TouchPointDto';
import { UpdateTouchPointDto } from '../dto/touchpoint/UpdateTouchPointDto';
import { TouchPointService } from '../service/Note/touchpoint.service';
import { TaskService } from '../service/Task/task.service';
import { TouchPointFileService } from '../service/TouchPoint_file/fileTouchPoint.service';

@Controller('touchpoint')
@ApiTags('touchpoint')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(AuthUserInterceptor)
@ApiBearerAuth()
export class TouchPointController {
    constructor(
        private _touchPointService: TouchPointService,
        private _fileTouchPointService: TouchPointFileService,
        private _taskTouchPointService: TaskService,
    ) {}

    @Post()
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({
        type: UpdateTouchPointDto,
        description: 'Successfully Created',
    })
    async createLead(
        @Body() data: UpdateTouchPointDto,
        @AuthUser() user: UserEntity,
    ): Promise<TouchPointDto> {
        const createTouchPoint = await this._touchPointService.create(
            user,
            data,
        );
        const touchPointId = parseInt(createTouchPoint.id, 10);
        if (data.file) {
            await this._fileTouchPointService.createFileTouchPoint(
                data.file,
                touchPointId,
                createTouchPoint.leadId,
            );
        }
        if (data.task) {
            await this._taskTouchPointService.create(
                user,
                data.task,
                createTouchPoint.id,
            );
        }
        return createTouchPoint;
    }
}
