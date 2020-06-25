'use strict';

import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { CompanyContactDto } from '../../company-contact/dto/CompanyContactDto';
import { LinkCompanyDto } from '../../company-contact/dto/UpdateLinkContactDto';
import { WebsiteDto } from '../../website/dto/WebsiteDto';

export class ContactUpdateDto {
    @IsString()
    @IsNotEmpty()
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
    @ApiProperty({ type: [WebsiteDto] })
    website: string;

    @IsArray()
    @ApiProperty({ type: [LinkCompanyDto] })
    company: CompanyContactDto[];
}
