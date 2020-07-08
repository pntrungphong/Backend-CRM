'use strict';

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString } from 'class-validator';

import { NoteDto } from '../note/dto/NoteDto';
import { ContactLeadDto } from './ContactLeadDto';
import { TagDto } from '../../tag/dto/TagDto';
import { TagEntity } from '../../tag/tag.entity';
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
    @IsString()
    @ApiPropertyOptional()
    createdBy: string;
    @IsString()
    @ApiPropertyOptional()
    updatedBy: string;
    @IsString()
    @ApiPropertyOptional()
    idCompany: string;
    @IsString()
    @ApiPropertyOptional()
    brif: string;
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
