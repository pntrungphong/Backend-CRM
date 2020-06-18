'use strict';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CompanyEntity } from './company.entity';
import { CompanyService } from './company.service';
import { CompanyDto } from './dto/CompanyDto';

@Controller('company')
@ApiTags('company')
export class CompanyController {
    constructor(private _companyService: CompanyService) {}

    @Post()
    async createCompany(@Body() data: CompanyDto): Promise<CompanyEntity> {
        return this._companyService.createCompany(data);
    }
}
