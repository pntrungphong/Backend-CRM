'use strict';

import { ApiPropertyOptional } from '@nestjs/swagger';

import { AbstractDto } from '../../../common/dto/AbstractDto';
import { WebsiteDto } from '../../website/dto/WebsiteDto';
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
    createdBy: string;

    @ApiPropertyOptional()
    updatedBy: string;

    @ApiPropertyOptional({ type: [WebsiteDto] })
    website: WebsiteDto[];

    constructor(contact: ContactEntity) {
        super(contact);
        this.name = contact.name;
        this.email = contact.email.split('|');
        this.phone = contact.phone.split('|');
        this.address = contact.address.split('|');
        this.createdBy = contact.createdBy;
        this.updatedBy = contact.updatedBy;
        this.website = contact.website;
    }
}
