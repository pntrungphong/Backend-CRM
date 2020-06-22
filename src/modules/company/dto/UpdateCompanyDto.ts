'use strict';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString } from 'class-validator';
export class UpdateCompanyDto {
    @IsString()
    @ApiPropertyOptional()
    name: string;

    @IsString()
    @ApiPropertyOptional()
    email: string;

    @IsString()
    @ApiPropertyOptional()
    updatedBy: string;
}
