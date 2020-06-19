'use strict';

import { ApiPropertyOptional } from '@nestjs/swagger';

import { RoleType } from '../../../common/constants/role-type';
import { AbstractDto } from '../../../common/dto/AbstractDto';
import { CompanyEntity } from '../company.entity';

export class CreateCompanyDto {
    @ApiPropertyOptional()
    name: string;

    @ApiPropertyOptional()
    url: string;
    
    constructor(company: CompanyEntity) {
        this.name = company.name;
        this.url = company.url;
    }
}
