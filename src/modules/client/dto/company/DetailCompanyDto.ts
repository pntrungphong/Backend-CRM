'use strict';

import { ApiPropertyOptional } from '@nestjs/swagger';

import { TagDto } from '../../../tag/dto/TagDto';
import { CompanyEntity } from '../../entity/company.entity';
import { GeneralInfoDto } from '../contact/GeneralInfoDto';
import { EmailDto } from '../field/EmailDto';
import { PhoneDto } from '../field/PhoneDto';
import { WebsiteDto } from '../field/WebsiteDto';
import { BasicInfoLeadDto } from '../../../lead/dto/lead/BasicInfoLeadDto';

export class DetailCompanyDto {
    @ApiPropertyOptional()
    id: string;

    @ApiPropertyOptional()
    createdAt: Date;

    @ApiPropertyOptional()
    updatedAt: Date;

    @ApiPropertyOptional()
    name: string;

    @ApiPropertyOptional({ type: [EmailDto] })
    email: string;

    @ApiPropertyOptional({ type: [PhoneDto] })
    phone: string;

    @ApiPropertyOptional({ type: [] })
    address: string;

    @ApiPropertyOptional({ type: [WebsiteDto] })
    website: string;

    @ApiPropertyOptional()
    url: string;

    @ApiPropertyOptional({ type: [GeneralInfoDto] })
    contact: GeneralInfoDto[];

    @ApiPropertyOptional({ type: [TagDto] })
    tag: TagDto[];

    @ApiPropertyOptional({ type: [BasicInfoLeadDto] })
    lead: BasicInfoLeadDto[];

    @ApiPropertyOptional()
    createdBy: string;

    @ApiPropertyOptional()
    updatedBy: string;

    constructor(company: CompanyEntity) {
        this.id = company.id;
        this.name = company.name;
        this.email = company.email;
        this.phone = company.phone;
        this.address = company.address;
        this.website = company.website;
        this.url = company.url;
        this.tag = company.tag;
        this.lead = company.lead;
        this.createdBy = company.createdBy;
        this.updatedBy = company.updatedBy;
        this.createdAt = company.createdAt;
        this.updatedAt = company.updatedAt;
    }
}
