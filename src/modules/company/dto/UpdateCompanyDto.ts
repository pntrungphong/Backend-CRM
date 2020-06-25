'use strict';
import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

import { WebsiteDto } from '../../website/dto/WebsiteDto';
export class UpdateCompanyDto {
    @IsString()
    @ApiProperty()
    name: string;

    @IsOptional()
    @ApiProperty({ type: [] })
    email: string;

    @IsOptional()
    @ApiProperty({ type: [] })
    phone: string;

    @IsOptional()
    @ApiProperty({ type: [] })
    address: string;

    @IsOptional()
    @ApiProperty()
    url: string;

    @IsOptional()
    @ApiProperty({ type: [WebsiteDto] })
    website: string;
}
