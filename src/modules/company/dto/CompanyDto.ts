'use strict';

import { ApiPropertyOptional } from '@nestjs/swagger';

import { AbstractDto } from '../../../common/dto/AbstractDto';
import { CompanyEntity } from '../company.entity';

export class CompanyDto extends AbstractDto {
    @ApiPropertyOptional()
    name: string;

    @ApiPropertyOptional()
    email: string[];

    @ApiPropertyOptional()
    phone: string[];

    @ApiPropertyOptional()
    address: string[];

    @ApiPropertyOptional()
    website: string[];

    @ApiPropertyOptional()
    url: string[];

    @ApiPropertyOptional()
    tag: string[];

    @ApiPropertyOptional()
    createdBy: string;

    @ApiPropertyOptional()
    updatedBy: string;

    constructor(company: CompanyEntity) {
        super(company);
        this.name = company.name;
        this.email = company.email.split('|');
        this.phone = company.phone.split('|');
        this.address = company.address.split('|');
        this.website = company.website.split('|');
        this.url = company.url.split('|');
        this.tag = company.tag.split('|');
        this.createdBy = company.createdBy;
        this.updatedBy = company.updatedBy;
    }
}
