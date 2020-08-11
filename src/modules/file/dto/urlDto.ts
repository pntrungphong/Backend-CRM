'use strict';

import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UrlDto {
    @IsNotEmpty()
    @IsString()
    @ApiPropertyOptional()
    name: string;

    @IsNotEmpty()
    @IsString()
    @ApiPropertyOptional()
    url: string;

    @IsOptional()
    @IsNumber()
    @ApiPropertyOptional()
    touchPointId: number;

    @IsOptional()
    @IsNumber()
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
