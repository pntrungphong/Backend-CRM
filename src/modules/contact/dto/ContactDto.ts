'use strict';

import { ApiPropertyOptional } from '@nestjs/swagger';

import { AbstractDto } from '../../../common/dto/AbstractDto';
import { CompanyContactEntity } from '../../companyContact/companyContact.entity';
import { WebsiteDto } from '../../website/dto/WebsiteDto';
import { ContactEntity } from '../contact.entity';

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

    @ApiPropertyOptional()
    createdBy: string;

    @ApiPropertyOptional()
    updatedBy: string;
    @ApiPropertyOptional({ type: [CompanyContactEntity] })
    companyContact: CompanyContactEntity[];
    constructor(contact: ContactEntity) {
        super(contact);
        this.name = contact.name;
        this.email = contact.email;
        this.phone = contact.phone;
        this.address = contact.address;
        this.createdBy = contact.createdBy;
        this.updatedBy = contact.updatedBy;
        this.website = contact.website;
        this.companyContact = contact.cpt;
    }
}
