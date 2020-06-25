'use strict';

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ContactReferralDto } from '../../contactreferral/dto/ContactReferralDto';

export class ContactUpdateDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly name: string;

    @IsArray()
    @IsOptional()
    @ApiProperty({type: []})
    readonly email: string;

    @IsArray()
    @IsOptional()
    @ApiProperty({type: []})
    readonly phone: string;

    @IsArray()
    @IsOptional()
    @ApiProperty({type: []})
    readonly address: string;

    @IsArray()
    @IsOptional()
    @ApiProperty()
    readonly website: string[];

    @IsArray()
    @IsOptional()
    @ApiProperty()
    readonly tag: string[];

    @IsArray()
    @IsOptional()
    @ApiProperty()
    readonly contactReferral: ContactReferralDto[];
}
