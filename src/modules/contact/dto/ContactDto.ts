'use strict';

import { ApiPropertyOptional } from '@nestjs/swagger';

import { AbstractDto } from '../../../common/dto/AbstractDto';
import { ContactEntity } from '../contact.entity';

export class ContactDto extends AbstractDto {
    @ApiPropertyOptional()
    name: string;

    @ApiPropertyOptional()
    email: string[];

    @ApiPropertyOptional()
    phone: string[];

    @ApiPropertyOptional()
    address: string[];

    @ApiPropertyOptional()
    website: string[];

    @ApiPropertyOptional()
    tag: string[];

    @ApiPropertyOptional()
    createdBy: string;

    @ApiPropertyOptional()
    updatedBy: string;

    constructor(contact: ContactEntity) {
        super(contact);
        this.name = contact.name;
        this.email = contact.email.split('|');
        this.phone = contact.phone.split('|');
        this.address = contact.address.split('|');
        this.website = contact.website.split('|');
        this.tag = contact.tag.split('|');
        this.createdBy = contact.createdBy;
        this.updatedBy = contact.updatedBy;
    }
}
