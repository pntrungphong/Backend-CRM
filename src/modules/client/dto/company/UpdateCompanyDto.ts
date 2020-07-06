'use strict';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString } from 'class-validator';

import { TagDto } from '../../../tag/dto/TagDto';
import { CompanyContactDto } from '../company-contact/CompanyContactDto';
import { LinkContactDto } from '../company-contact/UpdateLinkCompanyDto';
import { EmailDto } from '../field/EmailDto';
import { PhoneDto } from '../field/PhoneDto';
import { WebsiteDto } from '../field/WebsiteDto';

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

    @IsOptional()
    @ApiProperty({ type: [TagDto] })
    tag: TagDto[];
}
