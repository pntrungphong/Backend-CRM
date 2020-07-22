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
import { UserEntity } from '../../user/user.entity';
import { CompaniesPageDetailDto } from '../dto/company/CompaniesPageDetailDto';
import { CompaniesPageDto } from '../dto/company/CompaniesPageDto';
import { CompaniesPageOptionsDto } from '../dto/company/CompaniesPageOptionsDto';
import { CompanyDto } from '../dto/company/CompanyDto';
import { DetailCompanyDto } from '../dto/company/DetailCompanyDto';
import { UpdateCompanyDto } from '../dto/company/UpdateCompanyDto';
import { CompanyService } from '../service/company.service';
import { CompanyContactService } from '../service/companyContact.service';

@Controller('company')
@ApiTags('company')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(AuthUserInterceptor)
@ApiBearerAuth()
export class CompanyController {
    constructor(
        private _companyService: CompanyService,
        private _companyContactService: CompanyContactService,
    ) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Get companies list',
        type: CompaniesPageDto,
    })
    getCompanies(
        @Query(new ValidationPipe({ transform: true }))
        pageOptionsDto: CompaniesPageOptionsDto,
    ): Promise<CompaniesPageDetailDto> {
        return this._companyService.getList(pageOptionsDto);
    }

    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Get company by id',
        type: DetailCompanyDto,
    })
    async getCompanyById(@Param('id') id: string): Promise<DetailCompanyDto> {
        return this._companyService.findById(id);
    }

    @Post()
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({ type: CompanyDto, description: 'Successfully Created' })
    async createCompany(
        @Body() data: UpdateCompanyDto,
        @AuthUser() user: UserEntity,
    ): Promise<CompanyDto> {
        const createCompany = await this._companyService.create(user, data);
        if (data.contact) {
            await this._companyContactService.createContact(
                data.contact,
                createCompany.id,
            );
        }

        return createCompany.toDto() as CompanyDto;
    }

    @Put(':id')
    @ApiOkResponse({
        type: UpdateCompanyDto,
        description: 'Successfully Updated',
    })
    async update(
        @Param('id') id: string,
        @Body() data: UpdateCompanyDto,
        @AuthUser() user: UserEntity,
    ): Promise<UpdateCompanyDto> {
        const updatedCompany = await this._companyService.update(
            id,
            data,
            user,
        );

        if (data.contact) {
            await this._companyContactService.updateContact(
                data.contact,
                updatedCompany.id,
            );
        }
        return updatedCompany.toDto() as UpdateCompanyDto;
    }
}
