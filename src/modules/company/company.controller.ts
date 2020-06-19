'use strict';
import {
    Body,
    Controller,
    Param,
    Post,
    Put,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthUser } from '../../decorators/auth-user.decorator';
import { AuthGuard } from '../../guards/auth.guard';
import { AuthUserInterceptor } from '../../interceptors/auth-user-interceptor.service';
import { UserEntity } from '../../modules/user/user.entity';
import { CompanyService } from './company.service';
import { CompanyDto } from './dto/CompanyDto';
import { CreateCompanyDto } from './dto/CreateCompanyDto';
import { UpdateCompanyDto } from './dto/UpdateCompanyDto';
import { UpdateCompanyService } from './updateCompany.service';

@Controller('company')
@ApiTags('company')
export class CompanyController {
    constructor(
        private _companyService: CompanyService,
        private readonly _updateCompanyService: UpdateCompanyService,
    ) {}

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
