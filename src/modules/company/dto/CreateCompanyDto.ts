'use strict';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString } from 'class-validator';
export class CreateCompanyDto {
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
    createdBy: string;

    @IsString()
    @ApiPropertyOptional()
    updatedBy: string;
}
