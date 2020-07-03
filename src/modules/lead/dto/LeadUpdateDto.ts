'use strict';

import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString } from 'class-validator';

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

    // constructor(lead: LeadEntity) {
    //     this.name = lead.name;
    //     this.createdBy = lead.createdBy;
    //     this.updatedBy = lead.updatedBy;
    //     this.rank=lead.rank;
    //     this.status=lead.status
    // }
}
