'use strict';

import { ApiPropertyOptional } from '@nestjs/swagger';

import { GeneralInfoDto as CompnayData } from '../../company/dto/GeneralInfoDto';
import { EmailDto } from '../../website/dto/EmailDto';
import { PhoneDto } from '../../website/dto/PhoneDto';
import { WebsiteDto } from '../../website/dto/WebsiteDto';
import { ContactEntity } from '../contact.entity';
import { GeneralInfoDto as ContactData } from './GeneralInfoDto';

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

    @ApiPropertyOptional({ type: [CompnayData] })
    company: CompnayData[];

    @ApiPropertyOptional({ type: [ContactData] })
    referral: ContactData[];

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
        this.createdBy = contact.createdBy;
        this.updatedBy = contact.updatedBy;
        this.createdAt = contact.createdAt;
        this.updatedAt = contact.updatedAt;
    }
}
