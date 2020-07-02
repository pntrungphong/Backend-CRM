'use strict';

import { ApiPropertyOptional } from '@nestjs/swagger';

import { AbstractDto } from '../../../common/dto/AbstractDto';
import { CompanyContactEntity } from '../../company-contact/companyContact.entity';
import { EmailDto } from '../../website/dto/EmailDto';
import { PhoneDto } from '../../website/dto/PhoneDto';
import { WebsiteDto } from '../../website/dto/WebsiteDto';
import { CompanyEntity } from '../company.entity';

export class CompanyDto extends AbstractDto {
    @ApiPropertyOptional()
    name: string;

    @ApiPropertyOptional({ type: [EmailDto] })
    email: string;

    @ApiPropertyOptional({ type: [PhoneDto] })
    phone: string;

    @ApiPropertyOptional({ type: [WebsiteDto] })
    website: string;

    @ApiPropertyOptional({ type: [] })
    address: string;

    @ApiPropertyOptional()
    url: string;

    @ApiPropertyOptional({ type: [CompanyContactEntity] })
    contact: CompanyContactEntity[];

    @ApiPropertyOptional()
    createdBy: string;

    @ApiPropertyOptional()
    updatedBy: string;

    constructor(company: CompanyEntity) {
        super(company);
        this.name = company.name;
        this.email = company.email;
        this.phone = company.phone;
        this.address = company.address;
        this.website = company.website;
        this.url = company.url;
        this.contact = company.contact;
        this.createdBy = company.createdBy;
        this.updatedBy = company.updatedBy;
    }
}
