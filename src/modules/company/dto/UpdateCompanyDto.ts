'use strict';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString } from 'class-validator';

import { CreateWebsiteDto } from '../../website/dto/CreateWebsiteDto';
import { WebsiteDto } from '../../website/dto/WebsiteDto';
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

    @IsOptional()
    @ApiProperty({ type: [CreateWebsiteDto] })
    website: WebsiteDto[];
}
