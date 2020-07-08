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
import { UserEntity } from '../../modules/user/user.entity';
import { DetailLeadDto } from './dto/DetailLeadDto';
import { LeadDto } from './dto/LeadDto';
import { LeadsPageDetailDto } from './dto/LeadsPageDetailDto';
import { LeadsPageDto } from './dto/LeadsPageDto';
import { LeadsPageOptionsDto } from './dto/LeadsPageOptionsDto';
import { LeadUpdateDto } from './dto/LeadUpdateDto';
import { LeadService } from './lead.service';
import { NoteService } from './note/note.service';
@Controller('lead')
@ApiTags('lead')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(AuthUserInterceptor)
@ApiBearerAuth()
export class LeadController {
    constructor(
        private _leadService: LeadService,
        private _noteService: NoteService,
    ) { }

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
    ): Promise<LeadDto> {
        const createLead = await this._leadService.create(user, data);
        if (data.note) {
            await this._noteService.create(data.note, createLead.id);
        }
        if (data.linkContact) {
            for await (const iterator of data.linkContact) {
                await getConnection()
                    .createQueryBuilder()
                    .insert()
                    .into('contact_lead')
                    .values([
                        {
                            contact_id: iterator.idContact,
                            lead_id: createLead.id,
                        },
                    ])
                    .execute();
            }
        }
        return createLead.toDto() as LeadDto;
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
    ): Promise<LeadUpdateDto> {
        if (updateDto.tag) {
            for await (const iterator of updateDto.tag) {
                await getConnection()
                    .createQueryBuilder()
                    .delete()
                    .from('tag_source')
                    .where("source_id = :id", { id: id })
                    .execute();
            }
            const updatedLead = await this._leadService.update(id, updateDto, user);
            if (!updatedLead) {
                throw new HttpException(
                    'Cập nhật thất bại',
                    HttpStatus.NOT_ACCEPTABLE,
                );
            }
            if (updateDto.note) {
                await this._noteService.update(updateDto.note, updatedLead.id);
            }
            if (updateDto.linkContact) {
                for await (const iterator of updateDto.linkContact) {
                    await getConnection()
                        .createQueryBuilder()
                        .delete()
                        .from('contact_lead')
                        .where("lead_id = :id", { id: id })
                        .execute();

                    await getConnection()
                        .createQueryBuilder()
                        .insert()
                        .into('contact_lead')
                        .values([
                            { contact_id: iterator.idContact, lead_id: updatedLead.id }
                        ])
                        .execute();

                }


            }
            return updatedLead.toDto() as LeadUpdateDto;
        }
    }
}
