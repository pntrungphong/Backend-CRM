'use strict';

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString } from 'class-validator';

import { TagDto } from '../../../tag/dto/TagDto';
import { NoteDto } from '../note/NoteDto';
import { ContactLeadDto } from './ContactLeadDto';
import { RankRevisionDto } from '../../../../modules/lead/field/RankRevisionDto';
export class LeadUpdateDto {
    @IsString()
    @ApiPropertyOptional()
    name: string;
    @IsString()
    @ApiPropertyOptional()
    status: string;
    @IsString()
    @ApiPropertyOptional()
    rank: string;
    @IsString()
    @ApiPropertyOptional()
    description: string;
    @IsOptional()
    @ApiPropertyOptional()
    review: string;
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
