'use strict';

import { ApiPropertyOptional } from '@nestjs/swagger';

import { AbstractDto } from '../../../common/dto/AbstractDto';
import { ContactEntity } from '../contact.entity';
import { ContactReferralEntity } from 'modules/contactreferral/contactreferral.entity';

export class ContactDto extends AbstractDto {
    @ApiPropertyOptional()
    name: string;

    @ApiPropertyOptional()
    email: string;

    @ApiPropertyOptional()
    phone: string;

    @ApiPropertyOptional()
    address: string;

    @ApiPropertyOptional()
    website: string;

    @ApiPropertyOptional()
    createdBy: string;

    @ApiPropertyOptional()
    updatedBy: string;

    @ApiPropertyOptional({type: [ContactReferralEntity]})
    contactReferral: ContactReferralEntity[];

    constructor(contact: ContactEntity) {
        super(contact);
        this.name = contact.name;
        this.email = contact.email;
        this.phone = contact.phone;
        this.address = contact.address;
        this.website = contact.website;
        this.createdBy = contact.createdBy;
        this.updatedBy = contact.updatedBy;
        this.contactReferral = contact.contactReferral;
    }
}
