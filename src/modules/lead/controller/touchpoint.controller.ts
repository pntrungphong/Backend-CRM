'use strict';
import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Logger,
    Param,
    Post,
    Put,
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
import { UpdateDetailTouchPointDto } from '../dto/touchpoint/UpdateDetailTouchPointDto';
import { UpdateTouchPointDto } from '../dto/touchpoint/UpdateTouchPointDto';
import { UpdateTouchPointMarkDoneDto } from '../dto/touchpoint/UpdateTouchPointMarkDoneDto';
import { TouchPointService } from '../service/TouchPoint/touchpoint.service';

@Controller('touchpoint')
@ApiTags('touchpoint')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(AuthUserInterceptor)
@ApiBearerAuth()
export class TouchPointController {
    public logger = new Logger(TouchPointController.name);
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
        this.logger.log('GET LIST');
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
        this.logger.log('POST');
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
        type: UpdateDetailTouchPointDto,
        description: 'Successfully Updated',
    })
    async update(
        @Param('id') id: string,
        @Body() updateDto: UpdateDetailTouchPointDto,
        @AuthUser() user: UserEntity,
    ): Promise<UpdateDetailTouchPointDto> {
        const updatedLead = await this._touchPointService.update(
            id,
            updateDto,
            user,
        );
        return updatedLead.toDto() as UpdateDetailTouchPointDto;
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
