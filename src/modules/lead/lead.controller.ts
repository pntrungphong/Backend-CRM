'use strict';
import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Put,
    Query,
    UseGuards,
    UseInterceptors,
    ValidationPipe,
    Post,
    UploadedFiles,
    UploadedFile,
} from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiOkResponse,
    ApiResponse,
    ApiTags,
    ApiConsumes,
} from '@nestjs/swagger';

import { AuthUser } from '../../decorators/auth-user.decorator';
import { AuthGuard } from '../../guards/auth.guard';
import { RolesGuard } from '../../guards/roles.guard';
import { AuthUserInterceptor } from '../../interceptors/auth-user-interceptor.service';
import { UserEntity } from '../../modules/user/user.entity';
import { LeadsPageDetailDto } from './dto/LeadsPageDetailDto';
import { LeadsPageDto } from './dto/LeadsPageDto';
import { LeadsPageOptionsDto } from './dto/LeadsPageOptionsDto';
import { LeadUpdateDto } from './dto/LeadUpdateDto';
import { LeadService } from './lead.service';
import { NoteService } from './note/note.service';
import { LeadDto } from './dto/LeadDto';
import { getConnection } from "typeorm";
import { DetailLeadDto } from './dto/DetailLeadDto';
import { FileInterceptor, AnyFilesInterceptor } from '@nestjs/platform-express';
import { ApiFile } from '../../decorators/swagger.schema';
import { IFile } from '../../interfaces/IFile';
import { diskStorage } from 'multer'
import { extname } from 'path'
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
    async getCompanyById(
        @Param('id') id: string,
    ): Promise<DetailLeadDto> {
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
                        { contact_id: iterator.idContact, lead_id: createLead.id }
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
        @Body() data: LeadUpdateDto,
        @AuthUser() user: UserEntity,
    ): Promise<LeadUpdateDto> {
        const updatedLead = await this._leadService.update(id, data, user);
        await this._noteService.update(data.note, updatedLead.id);
        return updatedLead.toDto() as LeadUpdateDto;
    }
}
