'use strict';

import { ApiPropertyOptional } from '@nestjs/swagger';

import { AbstractDto } from '../../../../common/dto/AbstractDto';
import { FileDto } from '../../../file/dto/fileDto';
import { TagDto } from '../../../tag/dto/TagDto';
import { LeadEntity } from '../../entity/Lead/lead.entity';
import { NoteDto } from '../note/NoteDto';
import { TouchPointDto } from '../touchpoint/TouchPointDto';
import { InfoLeadCompanyDto } from './InfoLeadCompanyDto';
import { InfoLeadContactDto } from './InfoLeadContactDto';
import { RankRevisionDto } from '../../../../modules/lead/field/RankRevisionDto';
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
    review: string;
    @ApiPropertyOptional({ type: [RankRevisionDto] })
    rankRevision: RankRevisionDto[];
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
    @ApiPropertyOptional({ type: [InfoLeadContactDto] })
    relatedTo: InfoLeadContactDto[];
    @ApiPropertyOptional({ type: [TagDto] })
    tag: TagDto[];
    @ApiPropertyOptional({ type: [TouchPointDto] })
    touchpoint: TouchPointDto[];
    @ApiPropertyOptional({ type: [FileDto] })
    file: FileDto[];

    constructor(lead: LeadEntity) {
        super(lead);
        this.name = lead.name;
        this.status = lead.status;
        this.rank = lead.rank;
        this.note = lead.note;
        this.createdBy = lead.createdBy;
        this.updatedBy = lead.updatedBy;
        this.company = lead.company.toDto() as InfoLeadCompanyDto;
        this.contact = lead.contact.toDtos();
        this.description = lead.description;
        this.tag = lead.tag;
        this.status = lead.status;
        this.review = lead.review;
        this.touchpoint = lead.touchpoint;
        this.rankRevision=lead.rankRevision;
        this.relatedTo = lead.relatedTo.toDtos();
    }
}
