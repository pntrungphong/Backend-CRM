'use strict';

import { ApiPropertyOptional } from '@nestjs/swagger';

import { ContactEntity } from '../../../client/entity/contact.entity';

export class InfoLeadContactDto {
    @ApiPropertyOptional()
    name: string;

    @ApiPropertyOptional()
    id: string;

    constructor(contact: ContactEntity) {
        this.id = contact.id;
        this.name = contact.name;
    }
}
