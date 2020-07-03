'use strict';

import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { CompanyContactDto } from '../../company-contact/dto/CompanyContactDto';
import { LinkCompanyDto } from '../../company-contact/dto/UpdateLinkContactDto';
import { EmailDto } from '../../website/dto/EmailDto';
import { PhoneDto } from '../../website/dto/PhoneDto';
import { WebsiteDto } from '../../website/dto/WebsiteDto';
import { ContactReferralDto } from '../referral/dto/ContactReferralDto';

export class ContactUpdateDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    name: string;

    @IsOptional()
    @ApiProperty()
    title = '';

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
}
