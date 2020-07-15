'use strict';
import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Query,
    UseGuards,
    UseInterceptors,
    ValidationPipe,
} from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiOkResponse,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';

import { AuthUser } from '../../../decorators/auth-user.decorator';
import { AuthGuard } from '../../../guards/auth.guard';
import { RolesGuard } from '../../../guards/roles.guard';
import { AuthUserInterceptor } from '../../../interceptors/auth-user-interceptor.service';
import { UserEntity } from '../../../modules/user/user.entity';
import { TouchPointDto } from '../dto/touchpoint/TouchPointDto';
import { TouchPointsPageDto } from '../dto/touchpoint/TouchPointsPageDto';
import { TouchPointsPagesOptionsDto } from '../dto/touchpoint/TouchPointsPagesOptionsDto';
import { UpdateTouchPointDto } from '../dto/touchpoint/UpdateTouchPointDto';
import { TouchPointFileService } from '../service/TouchPoint_file/fileTouchPoint.service';
import { TouchPointService } from '../service/TouchPoint/touchpoint.service';

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

    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Get touchpoint list',
        type: TouchPointsPageDto,
    })
    getLeads(
        @Query(new ValidationPipe({ transform: true }))
        pageOptionsDto: TouchPointsPagesOptionsDto,
    ): Promise<TouchPointsPageDto> {
        return this._touchPointService.getList(pageOptionsDto);
    }

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
                createTouchPoint.leadId,
            );
        }
        return createTouchPoint;
    }
}
