'use strict';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';
import { integer } from 'aws-sdk/clients/cloudfront';
export class TagCompanyDto {
    @ApiPropertyOptional()
    idCompany: integer;

    @IsString()
    @ApiPropertyOptional()
    tagCompany: string[];
}
