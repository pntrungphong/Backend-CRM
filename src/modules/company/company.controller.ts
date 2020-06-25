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
import { UserEntity } from '../../modules/user/user.entity';
import { CompanyService } from './company.service';
import { CompaniesPageDto } from './dto/CompaniesPageDto';
import { CompaniesPageOptionsDto } from './dto/CompaniesPageOptionsDto';
import { CompanyDto } from './dto/CompanyDto';
import { UpdateCompanyDto } from './dto/UpdateCompanyDto';
import { TagCompanyService } from './tagcompany.service';

@Controller('company')
@ApiTags('company')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(AuthUserInterceptor)
@ApiBearerAuth()
export class CompanyController {
    constructor(private _companyService: CompanyService,
        private _tagcompanyService: TagCompanyService) {}

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
        return this._companyService.getList(pageOptionsDto);
    }

    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Get company by id',
        type: CompanyDto,
    })
    async getCompanyById(@Param('id') id: string) {
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

        await this._tagcompanyService.create(data.tagCompany, createCompany.id);

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
        
        return updatedCompany.toDto() as UpdateCompanyDto;
    }



}
