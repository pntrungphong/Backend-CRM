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

import { AuthUser } from '../../decorators/auth-user.decorator';
import { AuthGuard } from '../../guards/auth.guard';
import { RolesGuard } from '../../guards/roles.guard';
import { AuthUserInterceptor } from '../../interceptors/auth-user-interceptor.service';
import { UserEntity } from '../user/user.entity';
import { WebsiteService } from '../website/website.service';
import { ContactService } from './contact.service';
import { ContactDto } from './dto/ContactDto';
import { ContactsPageDto } from './dto/ContactsPageDto';
import { ContactsPageOptionsDto } from './dto/ContactsPageOptionsDto';
import { ContactUpdateDto } from './dto/ContactUpdateDto';

@Controller('contact')
@ApiTags('contact')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(AuthUserInterceptor)
@ApiBearerAuth()
export class ContactController {
    constructor(
        private _contactService: ContactService,
        private _websitetService: WebsiteService,
    ) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Get contacts list',
        type: ContactsPageDto,
    })
    getAll(
        @Query(new ValidationPipe({ transform: true }))
        pageOptionsDto: ContactsPageOptionsDto,
    ) {
        return this._contactService.getList(pageOptionsDto);
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Get companies list',
        type: ContactDto,
    })
    async getById(@Param('id') id: string) {
        return this._contactService.findById(id);
    }

    @Post()
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({
        type: ContactUpdateDto,
        description: 'Successfully Created',
    })
    async create(
        @Body() createDto: ContactUpdateDto,
        @AuthUser() user: UserEntity,
    ): Promise<ContactUpdateDto> {
        const createdContact = await this._contactService.create(
            createDto,
            user,
        );
        await this._websitetService.create(
            createDto.website,
            createdContact.id,
            'contact',
        );
        return createdContact.toDto() as ContactUpdateDto;
    }

    @Put(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({
        description: 'Update infomation contact',
        type: ContactUpdateDto,
    })
    async update(
        @Param('id') contactId: string,
        @Body() updateDto: ContactUpdateDto,
        @AuthUser() user: UserEntity,
    ) {
        const updatedContact = await this._contactService.update(
            contactId,
            updateDto,
            user,
        );
        await this._websitetService.update(
            updateDto.website,
            updatedContact.id,
            'contact',
        );
        return updatedContact.toDto() as ContactUpdateDto;
    }
}
