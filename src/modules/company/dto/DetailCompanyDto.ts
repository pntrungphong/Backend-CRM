'use strict';

import { ApiPropertyOptional } from '@nestjs/swagger';

import { GeneralInfoDto } from '../../contact/dto/GeneralInfoDto';
import { EmailDto } from '../../website/dto/EmailDto';
import { PhoneDto } from '../../website/dto/PhoneDto';
import { WebsiteDto } from '../../website/dto/WebsiteDto';
import { CompanyEntity } from '../company.entity';

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
        this.createdBy = company.createdBy;
        this.updatedBy = company.updatedBy;
        this.createdAt = company.createdAt;
        this.updatedAt = company.updatedAt;
    }
}
