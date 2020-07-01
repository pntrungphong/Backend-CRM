'use strict';

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

import { CompanyLeadUpdateDto } from '../../company/dto/CompanyLeadUpdateDto';
export class LeadUpdateDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    name: string;

    @IsString()
    @ApiProperty()
    status: string;

    @IsString()
    @ApiProperty()
    rank: string;

    @ApiProperty({ type: CompanyLeadUpdateDto })
    company: CompanyLeadUpdateDto;
}
