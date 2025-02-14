'use strict';

import { ApiPropertyOptional } from '@nestjs/swagger';

import { FileDto } from '../../../file/dto/fileDto';
import { RankRevisionDto } from '../../../lead/field/RankRevisionDto';
import { TagDto } from '../../../tag/dto/TagDto';
import { TagEntity } from '../../../tag/tag.entity';
import { LeadEntity } from '../../entity/Lead/lead.entity';
import { NoteDto } from '../note/NoteDto';
import { TouchPointDto } from '../touchpoint/TouchPointDto';
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

    @ApiPropertyOptional()
    onHov: number;

    @ApiPropertyOptional({ type: [NoteDto] })
    note: NoteDto[];
    @ApiPropertyOptional({ type: [RankRevisionDto] })
    rankRevision: RankRevisionDto[];
    @ApiPropertyOptional({ type: [InfoLeadCompanyDto] })
    company: InfoLeadCompanyDto;
    @ApiPropertyOptional({ type: [InfoLeadContactDto] })
    contact: InfoLeadContactDto[];
    @ApiPropertyOptional({ type: [InfoLeadContactDto] })
    relatedTo: InfoLeadContactDto[];
    @ApiPropertyOptional()
    createdBy: string;

    @ApiPropertyOptional()
    updatedBy: string;
    @ApiPropertyOptional({ type: [TagDto] })
    tag: TagEntity[];
    @ApiPropertyOptional({ type: [FileDto] })
    file: FileDto[];
    @ApiPropertyOptional({ type: [TouchPointDto] })
    touchPoint: TouchPointDto[];
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
        this.rank = lead.rank;
        this.status = lead.status;
        this.file = lead.file?.toDtos();
        this.relatedTo = lead.relatedTo?.toDtos();
        this.touchPoint = lead.touchPoint;
        this.rankRevision = lead.rankRevision;
        this.onHov = lead.onHov;
    }
}
