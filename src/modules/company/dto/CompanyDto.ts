'use strict';

import { ApiPropertyOptional } from '@nestjs/swagger';

import { AbstractDto } from '../../../common/dto/AbstractDto';
import { CompanyContactEntity } from '../../companyContact/companyContact.entity';
import { WebsiteDto } from '../../website/dto/WebsiteDto';
import { CompanyEntity } from '../company.entity';

export class CompanyDto extends AbstractDto {
    @ApiPropertyOptional()
    name: string;

    @ApiPropertyOptional({ type: [] })
    email: string;

    @ApiPropertyOptional({ type: [] })
    phone: string;

    @ApiPropertyOptional({ type: [] })
    address: string;

    @ApiPropertyOptional({ type: [WebsiteDto] })
    website: string;

    @ApiPropertyOptional()
    url: string;

    @ApiPropertyOptional()
    createdBy: string;

    @ApiPropertyOptional()
    updatedBy: string;
    @ApiPropertyOptional({ type: [CompanyContactEntity] })
    companyContact: CompanyContactEntity[];

    constructor(company: CompanyEntity) {
        super(company);
        this.name = company.name;
        this.email = company.email;
        this.phone = company.phone;
        this.address = company.address;
        this.website = company.website;
        this.url = company.url;
        this.createdBy = company.createdBy;
        this.companyContact = company.cpt;
        this.updatedBy = company.updatedBy;
    }
}
