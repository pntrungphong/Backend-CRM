'use strict';

import { ApiPropertyOptional } from '@nestjs/swagger';

import { AbstractDto } from '../../../common/dto/AbstractDto';
import { CompanyContactEntity } from '../../company-contact/companyContact.entity';
import { WebsiteDto } from '../../website/dto/WebsiteDto';
import { ContactEntity } from '../contact.entity';
import { ContactReferralEntity } from '../referral/contactreferral.entity';
import { TagContactEntity } from '../tag/tagcontact.entity';

export class ContactDto extends AbstractDto {
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

    @ApiPropertyOptional({ type: [CompanyContactEntity] })
    company: CompanyContactEntity[];

    @ApiPropertyOptional()
    createdBy: string;

    @ApiPropertyOptional()
    updatedBy: string;

    @ApiPropertyOptional({ type: [ContactReferralEntity] })
    referral: ContactReferralEntity[];

    @ApiPropertyOptional({ type: [TagContactEntity] })
    tag: TagContactEntity[];

    constructor(contact: ContactEntity) {
        super(contact);
        this.name = contact.name;
        this.email = contact.email;
        this.phone = contact.phone;
        this.address = contact.address;
        this.website = contact.website;
        this.company = contact.company;
        this.referral = contact.referral;
        this.createdBy = contact.createdBy;
        this.updatedBy = contact.updatedBy;
        this.tag = contact.tag;
    }
}
