'use strict';

import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UrlDto {
    @IsNotEmpty()
    @IsString()
    @ApiPropertyOptional()
    name: string;

    @IsNotEmpty()
    @IsString()
    @ApiPropertyOptional()
    url: string;

    @IsNotEmpty()
    @IsString()
    @ApiPropertyOptional()
    touchPointId: number;

    @IsNotEmpty()
    @IsString()
    @ApiPropertyOptional()
    leadId: number;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional()
    note: string;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional()
    type: string;
}
