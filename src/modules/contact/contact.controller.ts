'use strict';

import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpException,
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
import { CompanyContactService } from '../company-contact/companyContact.service';
import { UserEntity } from '../user/user.entity';
import { ContactService } from './contact.service';
import { ContactPageDetailDto } from './dto/ContactsPageDetailDto';
import { ContactsPageDto } from './dto/ContactsPageDto';
import { ContactsPageOptionsDto } from './dto/ContactsPageOptionsDto';
import { ContactUpdateDto } from './dto/ContactUpdateDto';
import { DetailContactDto } from './dto/DetailContactDto';
import { ContactReferralService } from './referral/referral.service';

@Controller('contact')
@ApiTags('contact')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(AuthUserInterceptor)
@ApiBearerAuth()
export class ContactController {
    constructor(
        private _contactService: ContactService,
        private _companyContactService: CompanyContactService,
        private _contactReferralService: ContactReferralService,
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
    ): Promise<ContactPageDetailDto> {
        return this._contactService.getList(pageOptionsDto);
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Get companies list',
        type: DetailContactDto,
    })
    async getById(@Param('id') id: string): Promise<DetailContactDto> {
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
        if (createDto.company) {
            await this._companyContactService.createCompany(
                createDto.company,
                createdContact.id,
            );
        }
        if (createDto.referral) {
            await this._contactReferralService.create(
                createDto.referral,
                createdContact.id,
            );
        }
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
    ): Promise<ContactUpdateDto> {
        const updatedContact = await this._contactService.update(
            contactId,
            updateDto,
            user,
        );
        if (!updatedContact) {
            throw new HttpException(
                'Cập nhật thất bại',
                HttpStatus.NOT_ACCEPTABLE,
            );
        }
        if (updateDto.company) {
            await this._companyContactService.updateCompany(
                updateDto.company,
                updatedContact.id,
            );
        }
        if (updateDto.referral) {
            await this._contactReferralService.update(
                updateDto.referral,
                updatedContact.id,
            );
        }
        return updatedContact.toDto() as ContactUpdateDto;
    }
}
