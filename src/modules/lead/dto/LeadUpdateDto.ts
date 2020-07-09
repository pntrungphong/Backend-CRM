'use strict';

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString } from 'class-validator';

import { TagDto } from '../../tag/dto/TagDto';
import { NoteDto } from '../note/dto/NoteDto';
import { ContactLeadDto } from './ContactLeadDto';
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
    createdBy: string;
    @IsOptional()
    @ApiPropertyOptional()
    updatedBy: string;
    @IsString()
    @ApiPropertyOptional()
    idCompany: string;
    @IsArray()
    @ApiProperty({ type: [ContactLeadDto] })
    linkContact: ContactLeadDto[];

    @IsArray()
    @ApiPropertyOptional({ type: [NoteDto] })
    note: NoteDto[];

    @IsOptional()
    @ApiProperty({ type: [TagDto] })
    tag: TagDto[];
}
