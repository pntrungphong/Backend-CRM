'use strict';

import { ApiPropertyOptional } from '@nestjs/swagger';

import { AbstractDto } from '../../../common/dto/AbstractDto';
import { CompanyContactDto } from '../../company-contact/dto/CompanyContactDto';
import { WebsiteDto } from '../../website/dto/WebsiteDto';
import { CompanyEntity } from '../company.entity';
// import { TagCompanyEntity } from '../tagcompany.entity';

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

    @ApiPropertyOptional({ type: [CompanyContactDto] })
    contact: CompanyContactDto[];

    @ApiPropertyOptional()
    createdBy: string;

    @ApiPropertyOptional()
    updatedBy: string;

    // @ApiPropertyOptional({ type: [TagCompanyEntity] })
    // tagCompany: TagCompanyEntity[];

    constructor(company: CompanyEntity) {
        super(company);
        this.name = company.name;
        this.email = company.email;
        this.phone = company.phone;
        this.address = company.address;
        this.website = company.website;
        this.url = company.url;
        this.contact = company.cpt;
        this.createdBy = company.createdBy;
        this.updatedBy = company.updatedBy;
    }
}
