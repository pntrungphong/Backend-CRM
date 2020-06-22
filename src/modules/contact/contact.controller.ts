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
import { ContactService } from './contact.service';
import { ContactCreateDto } from './dto/ContactCreateDto';
import { ContactDto } from './dto/ContactDto';
import { ContactsPageDto } from './dto/ContactsPageDto';
import { ContactsPageOptionsDto } from './dto/ContactsPageOptionsDto';
import { ContactUpdateDto } from './dto/ContactUpdateDto';

@Controller('contacts')
@ApiTags('contacts')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(AuthUserInterceptor)
@ApiBearerAuth()
export class ContactController {
    constructor(private _contactService: ContactService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Get contacts list',
        type: ContactsPageDto,
    })
    getCompanies(
        @Query(new ValidationPipe({ transform: true }))
        pageOptionsDto: ContactsPageOptionsDto,
    ) {
        return this._contactService.getContacts(pageOptionsDto);
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Get companies list',
        type: ContactDto,
    })
    async readContactById(@Param('id') id: string) {
        return this._contactService.readContactById(id);
    }

    

    @Post()
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({ type: ContactDto, description: 'Successfully Created' })
    async contactCreate(
        @Body() contactCreateDto: ContactCreateDto,
        @AuthUser() user: UserEntity,
    ): Promise<ContactDto> {
        const createdContact = await this._contactService.createContact(
            contactCreateDto,
            user,
        );
        return createdContact.toDto();
    }

    @Put(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({
        description: 'Update infomation contact',
        type: ContactUpdateDto,
    })
    async updateContact(
        @Param('id') contactId: string,
        @Body() contactData: ContactUpdateDto,
        @AuthUser() user: UserEntity,
    ) {
        const updatedContact = await this._contactService.updateContact(
            contactId,
            contactData,
            user,
        );
        return updatedContact.toDto();
    }
}
