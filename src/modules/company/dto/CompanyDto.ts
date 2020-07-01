'use strict';

import { ApiPropertyOptional } from '@nestjs/swagger';

import { AbstractDto } from '../../../common/dto/AbstractDto';
import { GeneralInfoDto } from '../../contact/dto/GeneralInfoDto';
import { EmailDto } from '../../website/dto/EmailDto';
import { PhoneDto } from '../../website/dto/PhoneDto';
import { WebsiteDto } from '../../website/dto/WebsiteDto';
import { CompanyEntity } from '../company.entity';
import { TagCompanyDto } from '../tag/dto/TagCompanyDto';

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

    @ApiPropertyOptional({ type: [GeneralInfoDto] })
    contact: GeneralInfoDto[];

    @ApiPropertyOptional()
    createdBy: string;

    @ApiPropertyOptional()
    updatedBy: string;

    @ApiPropertyOptional({ type: [TagCompanyDto] })
    tag: TagCompanyDto[];

    constructor(company: CompanyEntity) {
        super(company);
        this.name = company.name;
        this.email = company.email;
        this.phone = company.phone;
        this.address = company.address;
        this.website = company.website;
        this.url = company.url;
        this.createdBy = company.createdBy;
        this.updatedBy = company.updatedBy;
        this.tag = company.tag;
    }
}
