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

import { AuthUser } from '../../decorators/auth-user.decorator';
import { AuthGuard } from '../../guards/auth.guard';
import { RolesGuard } from '../../guards/roles.guard';
import { AuthUserInterceptor } from '../../interceptors/auth-user-interceptor.service';
import { UserEntity } from '../../modules/user/user.entity';
import { TouchPointFileService } from '../file/fileTouchPoint/fileTouchPoint.service';
import { TouchPointDto } from './dto/TouchPointDto';
import { UpdateTouchPointDto } from './dto/UpdateTouchPointDto';
import { TouchPointService } from './touchpoint.service';
@Controller('touchpoint')
@ApiTags('touchpoint')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(AuthUserInterceptor)
@ApiBearerAuth()
export class TouchPointController {
    constructor(
        private _touchPointService: TouchPointService,
        private _fileTouchPointService: TouchPointFileService,
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
        const idTouchPoint = parseInt(createTouchPoint.id);
        if (data.file) {
            await this._fileTouchPointService.createFileTouchPoint(
                data.file,
                idTouchPoint,
                createTouchPoint.idLead,
            );
        }
        return createTouchPoint;
    }
}
