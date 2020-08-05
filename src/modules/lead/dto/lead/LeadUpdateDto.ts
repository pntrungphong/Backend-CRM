'use strict';

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsEnum, IsOptional, IsString } from 'class-validator';

import { StatusLead } from '../../../../common/constants/status-lead';
import { TypeTouchPoint } from '../../../../common/constants/type-touchpoint';
import { RankRevisionDto } from '../../../../modules/lead/field/RankRevisionDto';
import { TagDto } from '../../../tag/dto/TagDto';
import { NoteDto } from '../note/NoteDto';
import { ContactLeadDto } from './ContactLeadDto';
export class LeadUpdateDto {
    @IsString()
    @ApiPropertyOptional()
    name: string;

    @IsEnum(StatusLead)
    @IsString()
    @ApiPropertyOptional({ example: 'In-progress' })
    status: string;

    @IsOptional()
    @ApiPropertyOptional({ example: '1' })
    rank: string;

    @IsString()
    @ApiPropertyOptional()
    description: string;

    @IsOptional()
    @ApiPropertyOptional()
    review: string;

    @IsEnum(TypeTouchPoint)
    @IsOptional()
    @ApiPropertyOptional({ example: 'PC' })
    lane: string;

    @IsOptional()
    @ApiPropertyOptional({ example: 0 })
    onHov: number;

    @IsOptional()
    @ApiProperty({ type: [RankRevisionDto] })
    rankRevision: RankRevisionDto;

    @IsString()
    @ApiPropertyOptional({ example: '1' })
    idCompany: string;

    @IsArray()
    @ApiProperty({ type: [ContactLeadDto] })
    linkContact: ContactLeadDto[];

    @IsArray()
    @ApiProperty({ type: [ContactLeadDto] })
    relatedTo: ContactLeadDto[];

    @IsArray()
    @ApiPropertyOptional({ type: [NoteDto] })
    note: NoteDto[];

    @IsOptional()
    @ApiPropertyOptional({ type: [TagDto] })
    tag: TagDto[];

    @IsOptional()
    @ApiPropertyOptional({ type: [String], example: { file: '1' } })
    file: string[];
}
