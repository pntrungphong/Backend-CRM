'use strict';
import { ApiPropertyOptional } from '@nestjs/swagger';

import { AbstractDto } from '../../../common/dto/AbstractDto';
import { CompanyEntity } from '../../company/company.entity';
import { LeadEntity } from '../lead.entity';
export class LeadDto extends AbstractDto {
    @ApiPropertyOptional()
    name: string;
    @ApiPropertyOptional()
    rank: string;
    @ApiPropertyOptional()
    status: string;
    @ApiPropertyOptional({ type: [CompanyEntity] })
    company: CompanyEntity[];

    @ApiPropertyOptional()
    createdBy: string;

    @ApiPropertyOptional()
    updatedBy: string;

    constructor(lead: LeadEntity) {
        super(lead);
        this.name = lead.name;
        this.createdBy = lead.createdBy;
        this.updatedBy = lead.updatedBy;
    }
}
