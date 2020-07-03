'use strict';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString } from 'class-validator';

import { CompanyContactDto } from '../../company-contact/dto/CompanyContactDto';
import { LinkContactDto } from '../../company-contact/dto/UpdateLinkCompanyDto';
import { EmailDto } from '../../website/dto/EmailDto';
import { PhoneDto } from '../../website/dto/PhoneDto';
import { WebsiteDto } from '../../website/dto/WebsiteDto';

export class UpdateCompanyDto {
    @IsString()
    @ApiProperty()
    name: string;

    @IsOptional()
    @ApiProperty({ type: [EmailDto] })
    email: string;

    @IsOptional()
    @ApiProperty({ type: [PhoneDto] })
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
    @IsOptional()
    @ApiProperty({ type: [LinkContactDto] })
    contact: CompanyContactDto[];
}
