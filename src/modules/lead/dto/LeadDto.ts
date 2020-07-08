'use strict';

import { ApiPropertyOptional } from '@nestjs/swagger';

import { AbstractDto } from '../../../common/dto/AbstractDto';
import { TagDto } from '../../tag/dto/TagDto';
import { LeadEntity } from '../lead.entity';
import { NoteDto } from '../note/dto/NoteDto';
import { InfoLeadCompanyDto } from './InfoLeadCompanyDto';
import { InfoLeadContactDto } from './InfoLeadContactDto';
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
    description: string;
    @ApiPropertyOptional()
    updatedBy: string;
    @ApiPropertyOptional()
    idCompany: string;
    @ApiPropertyOptional({ type: [NoteDto] })
    note: NoteDto[];
    @ApiPropertyOptional({ type: InfoLeadCompanyDto })
    company: InfoLeadCompanyDto;
    @ApiPropertyOptional({ type: [InfoLeadContactDto] })
    contact: InfoLeadContactDto[];
    @ApiPropertyOptional({ type: [TagDto] })
    tag: TagDto[];

    constructor(lead: LeadEntity) {
        super(lead);
        this.name = lead.name;
        this.status = lead.status;
        this.rank = lead.rank;
        this.note = lead.note;
        this.createdBy = lead.createdBy;
        this.updatedBy = lead.updatedBy;
        this.idCompany = lead.idCompany;
        this.company = lead.company;
        this.contact = lead.contact;
        this.description=lead.description;
        this.tag=lead.tag
    }
}
