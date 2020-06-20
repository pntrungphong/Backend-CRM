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
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AuthUser } from '../../decorators/auth-user.decorator';
import { AuthGuard } from '../../guards/auth.guard';
import { RolesGuard } from '../../guards/roles.guard';
import { AuthUserInterceptor } from '../../interceptors/auth-user-interceptor.service';
import { UserEntity } from '../../modules/user/user.entity';
import { CompanyService } from './company.service';
import { CompaniesPageDto } from './dto/CompaniesPageDto';
import { CompaniesPageOptionsDto } from './dto/CompaniesPageOptionsDto';
import { CompanyDto } from './dto/CompanyDto';
import { CreateCompanyDto } from './dto/CreateCompanyDto';
import { UpdateCompanyDto } from './dto/UpdateCompanyDto';
import { UpdateCompanyService } from './updateCompany.service';

@Controller('company')
@ApiTags('company')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(AuthUserInterceptor)
@ApiBearerAuth()
export class CompanyController {
    constructor(
        private _companyService: CompanyService,
        private readonly _updateCompanyService: UpdateCompanyService,
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
    ) {
        return this._companyService.getComapanies(pageOptionsDto);
    }

    @Post()
    @UseGuards(AuthGuard)
    @UseInterceptors(AuthUserInterceptor)
    @ApiBearerAuth()
    async createCompany(
        @Body() data: CreateCompanyDto,
        @AuthUser() user: UserEntity,
    ): Promise<CompanyDto> {
        const createCompany = await this._companyService.createCompany(
            user,
            data,
        );
        return createCompany.toDto();
    }
    @Put(':id/update')
    @UseGuards(AuthGuard)
    @UseInterceptors(AuthUserInterceptor)
    @ApiBearerAuth()
    async update(
        @Param('id') id: string,
        @Body() data: UpdateCompanyDto,
        @AuthUser() user: UserEntity,
    ): Promise<any> {
        const updatedCompany = await this._updateCompanyService.updateCompany(
            id,
            data,
            user,
        );
        return updatedCompany.toDto();
    }
}
