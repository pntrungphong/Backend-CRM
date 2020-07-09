'use strict';

import { ApiPropertyOptional } from '@nestjs/swagger';

import { FileDto } from '../../file/dto/fileDto';
import { TagDto } from '../../tag/dto/TagDto';
import { TagEntity } from '../../tag/tag.entity';
import { NoteDto } from '../dto/NoteDto';
import { LeadEntity } from '../entity/lead.entity';
import { InfoLeadCompanyDto } from './InfoLeadCompanyDto';
import { InfoLeadContactDto } from './InfoLeadContactDto';

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
    @ApiPropertyOptional()
    description: string;

    @ApiPropertyOptional({ type: [NoteDto] })
    note: NoteDto[];

    @ApiPropertyOptional({ type: [InfoLeadCompanyDto] })
    company: InfoLeadCompanyDto;
    @ApiPropertyOptional({ type: [InfoLeadContactDto] })
    contact: InfoLeadContactDto[];

    @ApiPropertyOptional()
    createdBy: string;

    @ApiPropertyOptional()
    updatedBy: string;
    @ApiPropertyOptional({ type: [TagDto] })
    tag: TagEntity[];
    @ApiPropertyOptional({ type: [FileDto] })
    file: FileDto[];
    constructor(lead: LeadEntity) {
        this.id = lead.id;
        this.name = lead.name;
        this.createdAt = lead.createdAt;
        this.updatedAt = lead.updatedAt;
        this.note = lead.note;
        this.createdBy = lead.createdBy;
        this.updatedBy = lead.updatedBy;
        this.company = lead.company;
        this.contact = lead.contact;
        this.description = lead.description;
        this.tag = lead.tag;
        this.status = lead.status;
        this.file = lead.file.toDtos();
    }
}
