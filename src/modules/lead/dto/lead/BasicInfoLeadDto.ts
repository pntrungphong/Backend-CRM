'use strict';

import { ApiPropertyOptional } from '@nestjs/swagger';

import { LeadEntity } from '../../entity/Lead/lead.entity';

export class BasicInfoLeadDto {
    @ApiPropertyOptional()
    id: string;

    @ApiPropertyOptional()
    createdAt: Date;

    @ApiPropertyOptional()
    updatedAt: Date;

    @ApiPropertyOptional()
    name: string;

    @ApiPropertyOptional()
    rank: string;

    @ApiPropertyOptional()
    status: string;

    @ApiPropertyOptional()
    description: string;

    @ApiPropertyOptional()
    createdBy: string;

    @ApiPropertyOptional()
    updatedBy: string;

    constructor(lead: LeadEntity) {
        this.id = lead.id;
        this.name = lead.name;
        this.createdAt = lead.createdAt;
        this.updatedAt = lead.updatedAt;
        this.createdBy = lead.createdBy;
        this.updatedBy = lead.updatedBy;
        this.rank = lead.rank;
        this.status = lead.status;
        this.description = lead.description;
    }
}
