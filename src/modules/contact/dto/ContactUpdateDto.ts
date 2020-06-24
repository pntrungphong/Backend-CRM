'use strict';

import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { WebsiteDto } from '../../website/dto/WebsiteDto';

export class ContactUpdateDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly name: string;

    @IsArray()
    @IsOptional()
    @ApiProperty()
    readonly email: string[];

    @IsArray()
    @IsOptional()
    @ApiProperty()
    readonly phone: string[];

    @IsArray()
    @IsOptional()
    @ApiProperty()
    readonly address: string[];

    @IsOptional()
    @ApiProperty({ type: [WebsiteDto] })
    website: WebsiteDto[];
}
