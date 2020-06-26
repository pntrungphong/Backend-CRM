'use strict';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { integer } from 'aws-sdk/clients/cloudfront';
import { IsString } from 'class-validator';
export class TagCompanyDto {
    @ApiPropertyOptional()
    idCompany: integer;

    @IsString()
    @ApiPropertyOptional()
    tagCompany: string[];
}
