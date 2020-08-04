'use strict';

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsEnum, IsOptional, IsString } from 'class-validator';

import { TypeTouchPoint } from '../../../../common/constants/type-touchpoint';
import { RankRevisionDto } from '../../../../modules/lead/field/RankRevisionDto';
import { TagDto } from '../../../tag/dto/TagDto';
import { NoteDto } from '../note/NoteDto';
import { ContactLeadDto } from './ContactLeadDto';
export class LeadUpdateDto {
    @IsString()
    @ApiPropertyOptional()
    name: string;
    @IsString()
    @ApiPropertyOptional()
    status: string;
    @IsOptional()
    @ApiPropertyOptional()
    rank: string;
    @IsString()
    @ApiPropertyOptional()
    description: string;
    @IsOptional()
    @ApiPropertyOptional()
    review: string;
    @IsEnum(TypeTouchPoint)
    @IsString()
    @ApiPropertyOptional()
    lane: string;
    @IsOptional()
    @ApiProperty({ type: [RankRevisionDto] })
    rankRevision: RankRevisionDto;
    @IsString()
    @ApiPropertyOptional()
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
    @ApiPropertyOptional({ type: [String] })
    file: string[];
}
