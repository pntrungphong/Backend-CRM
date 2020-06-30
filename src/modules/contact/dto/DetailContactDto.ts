'use strict';

import { ApiPropertyOptional } from '@nestjs/swagger';

import { AbstractDto } from '../../../common/dto/AbstractDto';
import { CompanyContactEntity } from '../../company-contact/companyContact.entity';
import { WebsiteDto } from '../../website/dto/WebsiteDto';
import { ContactEntity } from '../contact.entity';
import { ContactReferralEntity } from '../referral/contactreferral.entity';
import { TagContactEntity } from '../tag/tagcontact.entity';
import { GeneralInfoDto } from '../../company/dto/GeneralInfoDto';

export class DetailContactDto {


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

    @ApiPropertyOptional({ type: [GeneralInfoDto] })
    company: GeneralInfoDto[];

    @ApiPropertyOptional()
    createdBy: string;

    @ApiPropertyOptional()
    updatedBy: string;

    @ApiPropertyOptional({ type: [ContactReferralEntity] })
    referral: ContactReferralEntity[];

    @ApiPropertyOptional({ type: [TagContactEntity] })
    tag: TagContactEntity[];

    constructor(contact: ContactEntity) {
        this.id = contact.id;
        this.name = contact.name;
        this.email = contact.email;
        this.phone = contact.phone;
        this.address = contact.address;
        this.website = contact.website;
        this.referral = contact.referral;
        this.createdBy = contact.createdBy;
        this.updatedBy = contact.updatedBy;
        this.createdAt = contact.createdAt;
        this.updatedAt = contact.updatedAt;
        this.tag = contact.tag;
    }
}
