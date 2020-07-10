'use strict';

import { ApiPropertyOptional } from '@nestjs/swagger';

import { LeadEntity } from '../../lead/lead.entity';


export class InfoLeadTouchPointDto {
    @ApiPropertyOptional()
    name: string;

    @ApiPropertyOptional()
    id: string;

    constructor(lead: LeadEntity) {
        this.id = lead.id;
        this.name = lead.name;
    }
}
