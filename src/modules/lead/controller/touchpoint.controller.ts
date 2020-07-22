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
    Logger,
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
import { UpdateTouchPointMarkDoneDto } from '../dto/touchpoint/UpdateTouchPointMarkDoneDto';
import { TouchPointService } from '../service/TouchPoint/touchpoint.service';

@Controller('touchpoint')
@ApiTags('touchpoint')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(AuthUserInterceptor)
@ApiBearerAuth()
export class TouchPointController {
    constructor(private _touchPointService: TouchPointService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Get touchpoint list',
        type: TouchPointsPageDto,
    })
    getTouchPoints(
        @Query(new ValidationPipe({ transform: true }))
        pageOptionsDto: TouchPointsPagesOptionsDto,
    ): Promise<TouchPointsPageDto> {
        Logger.log('tp.controller');
        return this._touchPointService.getList(pageOptionsDto);
    }

    @Post()
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({
        type: UpdateTouchPointDto,
        description: 'Successfully Created',
    })
    async createTouchPoint(
        @Body() data: UpdateTouchPointDto,
        @AuthUser() user: UserEntity,
    ): Promise<TouchPointDto> {
        Logger.log('tp.controller');
        return this._touchPointService.create(user, data);
    }

    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Get companies list',
        type: TouchPointDto,
    })
    async getTouchPointById(@Param('id') id: string): Promise<TouchPointDto> {
        return this._touchPointService.getTouchPointById(id);
    }
    @Put(':id')
    @ApiOkResponse({
        type: UpdateTouchPointDto,
        description: 'Successfully Updated',
    })
    async update(
        @Param('id') id: string,
        @Body() updateDto: UpdateTouchPointDto,
        @AuthUser() user: UserEntity,
    ): Promise<UpdateTouchPointDto> {
        const updatedLead = await this._touchPointService.update(
            id,
            updateDto,
            user,
        );
        return updatedLead.toDto() as UpdateTouchPointDto;
    }
    @Put(':id/markDone')
    @ApiOkResponse({
        type: UpdateTouchPointMarkDoneDto,
        description: 'Successfully Updated',
    })
    async updateMarDone(
        @Param('id') id: string,
        @Body() updateDto: UpdateTouchPointMarkDoneDto,
        @AuthUser() user: UserEntity,
    ): Promise<UpdateTouchPointMarkDoneDto> {
        const updatedLead = await this._touchPointService.updateMarkDone(
            id,
            updateDto,
            user,
        );
        return updatedLead.toDto() as UpdateTouchPointMarkDoneDto;
    }
}
