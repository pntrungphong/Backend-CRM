'use strict';

import { ApiPropertyOptional } from '@nestjs/swagger';

import { AbstractDto } from '../../../common/dto/AbstractDto';
import { CompanyEntity } from '../company.entity';

export class CompanyDto extends AbstractDto {
    @ApiPropertyOptional()
    name: string;

    @ApiPropertyOptional()
    email: string;

    @ApiPropertyOptional()
    phone: string;

    @ApiPropertyOptional()
    address: string;

    @ApiPropertyOptional()
    website: string;
    @ApiPropertyOptional()
    url: string;

    constructor(company: CompanyEntity) {
        super(company);
        this.name = company.name;
        this.email = company.email;
        this.phone = company.phone;
        this.address = company.address;
        this.website = company.website;
        this.url = company.url;
    }
}
