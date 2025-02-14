'use strict';

import { ApiPropertyOptional } from '@nestjs/swagger';

import { TagDto } from '../../../tag/dto/TagDto';
import { TagEntity } from '../../../tag/tag.entity';
import { GeneralInfoDto as CompanyData } from '../../dto/company/GeneralInfoDto';
import { ContactEntity } from '../../entity/contact.entity';
import { EmailDto } from '../field/EmailDto';
import { PhoneDto } from '../field/PhoneDto';
import { WebsiteDto } from '../field/WebsiteDto';
import { GeneralInfoDto as ContactData } from './GeneralInfoDto';
import { BasicInfoLeadDto } from '../../../lead/dto/lead/BasicInfoLeadDto';

export class DetailContactDto {
    @ApiPropertyOptional()
    id: string;

    @ApiPropertyOptional()
    name: string;

    @ApiPropertyOptional()
    title: string;

    @ApiPropertyOptional({ type: [EmailDto] })
    email: string;

    @ApiPropertyOptional({ type: [PhoneDto] })
    phone: string;

    @ApiPropertyOptional({ type: [] })
    address: string;

    @ApiPropertyOptional({ type: [WebsiteDto] })
    website: string;

    @ApiPropertyOptional({ type: [CompanyData] })
    company: CompanyData[];

    @ApiPropertyOptional({ type: [ContactData] })
    referral: ContactData[];

    @ApiPropertyOptional({ type: [TagDto] })
    tag: TagEntity[];

    
    @ApiPropertyOptional({ type: [BasicInfoLeadDto] })
    lead: BasicInfoLeadDto[];

    @ApiPropertyOptional()
    createdBy: string;

    @ApiPropertyOptional()
    updatedBy: string;

    @ApiPropertyOptional()
    createdAt: Date;

    @ApiPropertyOptional()
    updatedAt: Date;

    constructor(contact: ContactEntity) {
        this.id = contact.id;
        this.name = contact.name;
        this.title = contact.title;
        this.email = contact.email;
        this.phone = contact.phone;
        this.address = contact.address;
        this.website = contact.website;
        this.tag = contact.tag;
        this.lead = contact.lead;
        this.createdBy = contact.createdBy;
        this.updatedBy = contact.updatedBy;
        this.createdAt = contact.createdAt;
        this.updatedAt = contact.updatedAt;
    }
}
