'use strict';

import { ApiPropertyOptional } from '@nestjs/swagger';

import { AbstractDto } from '../../../common/dto/AbstractDto';
import { CompanyEntity } from '../company.entity';
import { TagCompanyEntity } from '../tagcompany.entity';

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
    url: string[];

    @ApiPropertyOptional()
    createdBy: string;

    @ApiPropertyOptional()
    updatedBy: string;

    @ApiPropertyOptional({type: [TagCompanyEntity]})
    tagCompany: TagCompanyEntity[];

    constructor(company: CompanyEntity) {
        super(company);
        this.name = company.name;
        this.email = company.email.split('|');
        this.phone = company.phone.split('|');
        this.address = company.address.split('|');
        this.url = company.url.split('|');
        this.createdBy = company.createdBy;
        this.updatedBy = company.updatedBy;
        this.tagCompany = company.tagCompany;
    }
}
