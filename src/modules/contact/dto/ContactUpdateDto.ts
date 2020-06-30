'use strict';

import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { CompanyContactDto } from '../../company-contact/dto/CompanyContactDto';
import { LinkCompanyDto } from '../../company-contact/dto/UpdateLinkContactDto';
import { ContactReferralDto } from '../referral/dto/ContactReferralDto';
import { WebsiteDto } from '../../website/dto/WebsiteDto';
import { TagContactDto } from '../tag/dto/TagContactDto';

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
    @IsOptional()
    @ApiProperty({ type: [LinkCompanyDto] })
    company: CompanyContactDto[];

    @IsArray()
    @IsOptional()
    @ApiProperty({ type: [ContactReferralDto] })
    referral: ContactReferralDto[];

    @IsArray()
    @IsOptional()
    @ApiProperty({ type: [TagContactDto] })
    tag: TagContactDto[];
}
