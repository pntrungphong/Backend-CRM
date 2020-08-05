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
import { InfoFileDetailDto } from '../dto/fileTouchPoint/infoFileDetailDto';
import { DetailLeadDto } from '../dto/lead/DetailLeadDto';
import { LeadChangeRankDto } from '../dto/lead/LeadChangeRankDto';
import { LeadChangeStatusDto } from '../dto/lead/LeadChangeStatusDto';
import { LeadDto } from '../dto/lead/LeadDto';
import { LeadsPageDetailDto } from '../dto/lead/LeadsPageDetailDto';
import { LeadsPageDto } from '../dto/lead/LeadsPageDto';
import { LeadsPageOptionsDto } from '../dto/lead/LeadsPageOptionsDto';
import { LeadUpdateByIdDto } from '../dto/lead/LeadUpdateByIdDto';
import { LeadUpdateDto } from '../dto/lead/LeadUpdateDto';
import { LeadEntity } from '../entity/Lead/lead.entity';
import { LeadService } from '../service/Lead/lead.service';
import { TouchPointFileService } from '../service/TouchPoint_file/fileTouchPoint.service';
import { Lead4LaneDto } from '../dto/lead/Lead4LaneDto';
@Controller('lead')
@ApiTags('lead')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(AuthUserInterceptor)
@ApiBearerAuth()
export class LeadController {
    constructor(
        private _leadService: LeadService,
        private _touchPointFileService: TouchPointFileService,
    ) {}

    @Get('')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Get leads list',
        type: LeadsPageDto,
    })
    getLeads(
        @Query(new ValidationPipe({ transform: true }))
        pageOptionsDto: LeadsPageOptionsDto,
    ): Promise<LeadsPageDetailDto> {
        Logger.log('lead.controller');
        return this._leadService.getList(pageOptionsDto);
    }

    @Get('lane')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Get leads list',
        type: Lead4LaneDto,
    })
    getLead4Lane(): Promise<Lead4LaneDto> {
        Logger.log('lead.controller');
        return this._leadService.getLead4Lane();
    }



    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Get companies list',
        type: LeadDto,
    })
    async getCompanyById(@Param('id') id: string): Promise<DetailLeadDto> {
        return this._leadService.findLeadById(id);
    }

    @Post()
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({ type: LeadUpdateDto, description: 'Successfully Created' })
    async createLead(
        @Body() data: LeadUpdateDto,
        @AuthUser() user: UserEntity,
    ): Promise<LeadEntity> {
        return this._leadService.create(user, data, data.lane);
    }

    @Put(':id')
    @ApiOkResponse({
        type: LeadUpdateByIdDto,
        description: 'Successfully Updated',
    })
    async update(
        @Param('id') id: string,
        @Body() updateDto: LeadUpdateByIdDto,
        @AuthUser() user: UserEntity,
    ): Promise<LeadEntity> {
        Logger.log('lead.controller');
        return this._leadService.update(id, updateDto, user);
    }
    @Put(':id/rank')
    @ApiOkResponse({
        type: LeadChangeRankDto,
        description: 'Successfully Updated',
    })
    async changeRank(
        @Param('id') id: string,
        @Body() updateDto: LeadChangeRankDto,
        @AuthUser() user: UserEntity,
    ): Promise<any> {
        await this._leadService.changeRank(id, updateDto, user);
    }
    @Get('/:id/file')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Get files list',
        type: InfoFileDetailDto,
    })
    async getFileByIdLead(
        @Param('id') id: string,
    ): Promise<InfoFileDetailDto[]> {
        return this._touchPointFileService.getList(id);
    }
    @Put(':id/status')
    @ApiOkResponse({
        type: LeadChangeStatusDto,
        description: 'Successfully Updated',
    })
    async changeStatus(
        @Param('id') id: string,
        @Body() updateDto: LeadChangeStatusDto,
        @AuthUser() user: UserEntity,
    ): Promise<any> {
        await this._leadService.changeStatus(id, updateDto, user);
    }
}
