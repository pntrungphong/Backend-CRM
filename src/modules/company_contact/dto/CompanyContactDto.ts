'use strict';

import { ApiPropertyOptional } from '@nestjs/swagger';

import { AbstractDto } from '../../../common/dto/AbstractDto';
import { CompanyContactEntity } from '../company_contact.entity';

export class CompanyDto extends AbstractDto {
    @ApiPropertyOptional()
    idCompany: string;

    @ApiPropertyOptional()
    idContact: string;

    constructor(companyContact: CompanyContactEntity) {
        super(companyContact);
        this.idCompany = companyContact.idCompany;
        this.idContact = companyContact.idContact;
    }
}
