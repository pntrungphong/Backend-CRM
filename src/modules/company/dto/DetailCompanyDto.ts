'use strict';

import { ApiPropertyOptional } from '@nestjs/swagger';

import { GeneralInfoDto } from '../../contact/dto/GeneralInfoDto';
import { WebsiteDto } from '../../website/dto/WebsiteDto';
import { CompanyEntity } from '../company.entity';
import { TagCompanyEntity } from '../tag/tagcompany.entity';

export class DetailCompanyDto {
    @ApiPropertyOptional()
    id: string;

    @ApiPropertyOptional()
    createdAt: Date;

    @ApiPropertyOptional()
    updatedAt: Date;

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

    @ApiPropertyOptional({ type: [GeneralInfoDto] })
    contact: GeneralInfoDto[];

    @ApiPropertyOptional()
    createdBy: string;

    @ApiPropertyOptional()
    updatedBy: string;

    // @ApiPropertyOptional({ type: [TagCompanyEntity] })
    // tag: TagCompanyEntity[];

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
        // this.tag = company.tag;
    }
}
