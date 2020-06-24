'use strict';

import { ApiPropertyOptional } from '@nestjs/swagger';

import { AbstractDto } from '../../../common/dto/AbstractDto';
import { CompanyContactEntity } from '../../companyContact/companyContact.entity';
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
    createdBy: string;

    @ApiPropertyOptional()
    updatedBy: string;
    @ApiPropertyOptional({ type: [CompanyContactEntity] })
    companyContact: CompanyContactEntity[];

    constructor(company: CompanyEntity) {
        super(company);
        this.name = company.name;
        this.email = company.email.split('|');
        this.phone = company.phone.split('|');
        this.address = company.address.split('|');
        this.url = company.url.split('|');
        this.createdBy = company.createdBy;
        this.companyContact = company.cpt;
        this.updatedBy = company.updatedBy;
    }
}
