'use strict';

import { ApiPropertyOptional } from '@nestjs/swagger';

import { ContactEntity } from '../contact.entity';

export class GeneralInfoDto {
    @ApiPropertyOptional()
    name: string;

    @ApiPropertyOptional()
    id: string;

    constructor(contact: ContactEntity) {
        this.id = contact.id;
        this.name = contact.name;
    }
}
