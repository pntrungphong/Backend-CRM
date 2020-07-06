'use strict';

import { ApiPropertyOptional } from '@nestjs/swagger';

import { AbstractDto } from '../../../common/dto/AbstractDto';
import { CompanyContactEntity } from '../../company-contact/companyContact.entity';
import { TagDto } from '../../tag/dto/TagDto';
import { EmailDto } from '../../website/dto/EmailDto';
import { PhoneDto } from '../../website/dto/PhoneDto';
import { WebsiteDto } from '../../website/dto/WebsiteDto';
import { ContactEntity } from '../contact.entity';
import { ContactReferralEntity } from '../referral/referral.entity';

export class ContactDto extends AbstractDto {
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

    @ApiPropertyOptional({ type: [CompanyContactEntity] })
    company: CompanyContactEntity[];

    @ApiPropertyOptional({ type: [TagDto] })
    tag: TagDto[];

    @ApiPropertyOptional()
    createdBy: string;

    @ApiPropertyOptional()
    updatedBy: string;

    @ApiPropertyOptional({ type: [ContactReferralEntity] })
    referral: ContactReferralEntity[];

    constructor(contact: ContactEntity) {
        super(contact);
        this.name = contact.name;
        this.title = contact.title;
        this.email = contact.email;
        this.phone = contact.phone;
        this.address = contact.address;
        this.website = contact.website;
        this.company = contact.company;
        this.referral = contact.referral;
        this.tag = contact.tag;
        this.createdBy = contact.createdBy;
        this.updatedBy = contact.updatedBy;
    }
}
