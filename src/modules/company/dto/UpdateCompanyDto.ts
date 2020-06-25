'use strict';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString } from 'class-validator';

import { LinkContactDto } from '../../companyContact/dto/UpdateLinkCompanyDto';
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

    @IsArray()
    @ApiProperty({ type: [LinkContactDto] })
    linkContact: LinkContactDto[];
}
