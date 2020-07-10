'use strict';
import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Post,
    Put,
    Query,
    UseGuards,
    UseInterceptors,
    ValidationPipe,
    HttpException,
} from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiOkResponse,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';
import { getConnection } from 'typeorm';

import { AuthUser } from '../../decorators/auth-user.decorator';
import { AuthGuard } from '../../guards/auth.guard';
import { RolesGuard } from '../../guards/roles.guard';
import { AuthUserInterceptor } from '../../interceptors/auth-user-interceptor.service';
import { TouchPointService } from './touchPoint.service';
import { TouchPointUpdateDto } from './dto/TouchPointUpdateDto';
import { TouchPointDto } from './dto/TouchPointDto';
import { UserEntity } from '../user/user.entity';
import { NoteTouchPointService } from './NoteTouchPoint/noteTouchPoint.service';
@Controller('touchpoint')
@ApiTags('touchpoint')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(AuthUserInterceptor)
@ApiBearerAuth()
export class TouchPointController {
    constructor(
        private _touchPointService: TouchPointService,
        private _noteTouchPointService: NoteTouchPointService,
    ) { }

 
    @Post()
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({ type: TouchPointDto, description: 'Successfully Created' })
    async createLead(
        @Body() data: TouchPointUpdateDto,
        @AuthUser() user: UserEntity,
    ): Promise<TouchPointDto> {
        const createTouchPoint = await this._touchPointService.create(user, data);
        if (data.note) {
            await this._noteTouchPointService.create(data.note, createTouchPoint.id);
        }
        return createTouchPoint.toDto();
    }



   
}
