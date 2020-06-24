'use strict';

import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

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

    @IsArray()
    @IsOptional()
    @ApiProperty()
    readonly website: string[];

    @IsArray()
    @IsOptional()
    @ApiProperty()
    readonly tag: string[];
}
