'use strict';

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

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
}
