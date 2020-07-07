'use strict';

import { ApiPropertyOptional } from '@nestjs/swagger';

import { AbstractDto } from '../../../../common/dto/AbstractDto';
import { TagDto } from '../../../tag/dto/TagDto';
import { CompanyEntity } from '../../entity/company.entity';
import { CompanyContactEntity } from '../../entity/companyContact.entity';
import { EmailDto } from '../field/EmailDto';
import { PhoneDto } from '../field/PhoneDto';
import { WebsiteDto } from '../field/WebsiteDto';

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

    @ApiPropertyOptional({ type: [TagDto] })
    tag: TagDto[];

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
        this.tag = company.tag;
        this.contact = company.contact;
        this.createdBy = company.createdBy;
        this.updatedBy = company.updatedBy;
    }
}
