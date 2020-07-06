'use strict';

import { ApiPropertyOptional } from '@nestjs/swagger';

import { CompanyEntity } from '../../company/company.entity';

export class InfoLeadCompanyDto {
    @ApiPropertyOptional()
    name: string;

    @ApiPropertyOptional()
    id: string;

    constructor(company: CompanyEntity) {
        this.id = company.id;
        this.name = company.name;
    }
}
