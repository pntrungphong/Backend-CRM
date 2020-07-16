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
import { DetailLeadDto } from '../dto/lead/DetailLeadDto';
import { LeadDto } from '../dto/lead/LeadDto';
import { LeadsPageDetailDto } from '../dto/lead/LeadsPageDetailDto';
import { LeadsPageDto } from '../dto/lead/LeadsPageDto';
import { LeadsPageOptionsDto } from '../dto/lead/LeadsPageOptionsDto';
import { LeadUpdateDto } from '../dto/lead/LeadUpdateDto';
import { LeadEntity } from '../entity/Lead/lead.entity';
import { LeadService } from '../service/Lead/lead.service';
import { NoteService } from '../service/Note/note.service';
@Controller('lead')
@ApiTags('lead')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(AuthUserInterceptor)
@ApiBearerAuth()
export class LeadController {
    constructor(
        private _leadService: LeadService,
        private _noteService: NoteService,
    ) {}

    @Get()
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
        return this._leadService.getList(pageOptionsDto);
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
        return this._leadService.create(user, data);
    }

    @Put(':id')
    @ApiOkResponse({
        type: LeadUpdateDto,
        description: 'Successfully Updated',
    })
    async update(
        @Param('id') id: string,
        @Body() updateDto: LeadUpdateDto,
        @AuthUser() user: UserEntity,
    ): Promise<LeadEntity> {
        return this._leadService.update(id, updateDto, user);
    }
}
