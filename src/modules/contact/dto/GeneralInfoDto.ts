'use strict';

import { ApiPropertyOptional } from '@nestjs/swagger';

import { ContactEntity } from '../contact.entity';

export class GeneralInfoDto {
    @ApiPropertyOptional()
    name: string;

    @ApiPropertyOptional()
    id: string;

    constructor(company: ContactEntity) {
        this.id = company.id;
        this.name = company.name;
    }
}
