/* eslint-disable @typescript-eslint/tslint/config */
'use strict';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CompanyService } from './company.service';
import { CompanyDto } from './dto/CompanyDto';

@Controller('company')
@ApiTags('company')
export class CompanyController {
    // eslint-disable-next-line @typescript-eslint/tslint/config
    // eslint-disable-next-line @typescript-eslint/naming-convention
    constructor(private companyService: CompanyService) {}

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    // eslint-disable-next-line @typescript-eslint/require-await
    @Post()
    createCompany(@Body() data: CompanyDto) {
        return this.companyService.createCompany(data);
    }
}
