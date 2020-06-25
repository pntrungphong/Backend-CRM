'use strict';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';
import { TagCompanyDto } from './TagCompanyDto';
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
    url: string[];

    @IsArray()
    @ApiPropertyOptional()
    tagCompany: TagCompanyDto[];

    @IsString()
    @ApiPropertyOptional()
    createBy: string;

    @IsString()
    @ApiPropertyOptional()
    updatedBy: string;
}
