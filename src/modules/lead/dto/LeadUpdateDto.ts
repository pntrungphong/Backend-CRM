'use strict';

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString } from 'class-validator';

import { ContactLeadUpdateDto } from '../contactLead/dto/ContactUpdateDto';
import { NoteDto } from '../note/dto/NoteDto';

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
    createdBy: string;
    @IsString()
    @ApiPropertyOptional()
    updatedBy: string;
    @IsString()
    @ApiPropertyOptional()
    idCompany: string;
    @IsOptional()
    @ApiProperty({ type: [ContactLeadUpdateDto] })
    contact: ContactLeadUpdateDto[];

    @IsArray()
    @ApiPropertyOptional({ type: [NoteDto] })
    note: NoteDto[];

    // constructor(lead: LeadEntity) {
    //     this.name = lead.name;
    //     this.createdBy = lead.createdBy;
    //     this.updatedBy = lead.updatedBy;
    //     this.rank=lead.rank;
    //     this.status=lead.status
    // }
}
