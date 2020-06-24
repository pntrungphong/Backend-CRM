'use strict';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';
export class UpdateCompanyDto {
    @IsString()
    @ApiPropertyOptional()
    name: string;

    @IsArray()
    @ApiPropertyOptional()
    email: string[];

    @IsArray()
    @ApiPropertyOptional()
    phone: string[];

    @IsArray()
    @ApiPropertyOptional()
    address: string[];

    @IsArray()
    @ApiPropertyOptional()
    website: string[];

    @IsArray()
    @ApiPropertyOptional()
    url: string[];

    @IsString()
    @ApiPropertyOptional()
    createBy: string;

    @IsString()
    @ApiPropertyOptional()
    updatedBy: string;
}
