'use strict';

import { ApiPropertyOptional } from '@nestjs/swagger';

import { AbstractDto } from '../../../common/dto/AbstractDto';
import { CompanyEntity } from '../../company/company.entity';

export class ContactDto extends AbstractDto {
    @ApiPropertyOptional()
    name: string;
    constructor(company: CompanyEntity) {
        super(company);
        this.name = company.name;
    }
}
