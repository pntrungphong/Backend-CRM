'use strict';

import { ApiPropertyOptional } from '@nestjs/swagger';

import { LeadEntity } from '../lead.entity';
import { NoteDto } from '../note/dto/NoteDto';
import { InfoLeadCompanyDto } from './InfoLeadCompanyDto';
export class DetailLeadCompanyDto {
    @ApiPropertyOptional()
    id: string;

    @ApiPropertyOptional()
    createdAt: Date;

    @ApiPropertyOptional()
    updatedAt: Date;
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
    @ApiPropertyOptional({ type: InfoLeadCompanyDto })
    company: InfoLeadCompanyDto;
    @ApiPropertyOptional({ type: [NoteDto] })
    note: NoteDto[];
    constructor(lead: LeadEntity) {
        this.id = lead.id;
        this.createdAt = lead.createdAt;
        this.updatedAt = lead.updatedAt;
        this.name = lead.name;
        this.status = lead.status;
        this.rank = lead.rank;
        this.createdBy = lead.createdBy;
        this.updatedBy = lead.updatedBy;
        this.company = lead.company;
        this.note = lead.note;
    }
}
