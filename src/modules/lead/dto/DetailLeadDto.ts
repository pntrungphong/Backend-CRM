'use strict';

import { ApiPropertyOptional } from '@nestjs/swagger';

import { LeadEntity } from '../lead.entity';
import { NoteDto } from '../note/dto/NoteDto';
import { InfoLeadCompanyDto } from './InfoLeadCompanyDto';

export class DetailLeadDto {
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

    @ApiPropertyOptional({ type: [NoteDto] })
    note: NoteDto[];

    @ApiPropertyOptional({ type: [InfoLeadCompanyDto] })
    company: InfoLeadCompanyDto;

    @ApiPropertyOptional()
    createdBy: string;

    @ApiPropertyOptional()
    updatedBy: string;

    constructor(lead: LeadEntity) {
        this.id = lead.id;
        this.name = lead.name;
        this.createdAt = lead.createdAt;
        this.updatedAt = lead.updatedAt;
        this.note = lead.note;
        this.createdBy = lead.createdBy;
        this.updatedBy = lead.updatedBy;
        this.company = lead.company;
    }
}
