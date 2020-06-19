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
import { UserDto } from '../user/dto/UserDto';
import { CompanyEntity } from './company.entity';
import { CompanyService } from './company.service';
import { CompanyDto } from './dto/CompanyDto';

@Controller('company')
@ApiTags('company')
export class CompanyController {
    constructor(private _companyService: CompanyService) {}

    @Post()
    @UseGuards(AuthGuard)
    @UseInterceptors(AuthUserInterceptor)
    @ApiBearerAuth()
    async createCompany(
        @Body() data: CompanyDto,
        @AuthUser() user: UserDto,
    ): Promise<CompanyEntity> {
        return this._companyService.createCompany(user, data);
    }
    @Put(':id/update')
    async update(
        @Param('id') id: string,
        @Body() data: CompanyDto,
    ): Promise<any> {
        return this._companyService.updateCompany(id, data);
    }
}
