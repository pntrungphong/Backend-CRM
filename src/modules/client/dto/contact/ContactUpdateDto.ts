'use strict';

import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { TagDto } from '../../../tag/dto/TagDto';
import { CompanyContactDto } from '../company-contact/CompanyContactDto';
import { LinkCompanyDto } from '../company-contact/UpdateLinkContactDto';
import { ContactReferralDto } from '../contact-referral/ContactReferralDto';
import { EmailDto } from '../field/EmailDto';
import { PhoneDto } from '../field/PhoneDto';
import { WebsiteDto } from '../field/WebsiteDto';

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
    @ApiProperty({ type: [TagDto] })
    tag: TagDto[];

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
