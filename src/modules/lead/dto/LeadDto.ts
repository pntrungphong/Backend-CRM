'use strict';

import { ApiPropertyOptional } from '@nestjs/swagger';

import { AbstractDto } from '../../../common/dto/AbstractDto';
import { LeadEntity } from '../lead.entity';
export class LeadDto extends AbstractDto {
    @ApiPropertyOptional()
    name: string;
    @ApiPropertyOptional()
    status: string;
    @ApiPropertyOptional()
    rank: string;
    @ApiPropertyOptional()
    createdBy: string;

    @ApiPropertyOptional()
    updatedBy: string;
    @ApiPropertyOptional()
    idCompany: string;

    constructor(lead: LeadEntity) {
        super(lead);
        this.name = lead.name;
        this.status = lead.status;
        this.rank = lead.rank;
        this.idCompany = lead.idCompany;
        this.createdBy = lead.createdBy;
        this.updatedBy = lead.updatedBy;
    }
}
