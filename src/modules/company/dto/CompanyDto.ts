'use strict';

import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString } from 'class-validator';
export class CompanyDto {
    @ApiPropertyOptional()
    id: string;
    @IsString()
    @ApiPropertyOptional()
    name: string;

    @IsString()
    @ApiPropertyOptional()
    address: string;

    @IsString()
    @ApiPropertyOptional()
    email: string;

    @IsString()
    @ApiPropertyOptional()
    phone: string;

    @IsString()
    @ApiPropertyOptional()
    website: string;

    @IsString()
    @ApiPropertyOptional()
    url: string;

    @IsString()
    @ApiPropertyOptional()
    createBy: string;

    @IsString()
    @ApiPropertyOptional()
    updateBy: string;
}
