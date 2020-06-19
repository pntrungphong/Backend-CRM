'use strict';

import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ContactCreateDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly name: string;

    @IsString()
    @IsEmail()
    @IsOptional()
    @ApiProperty()
    readonly email: string;

    @IsOptional()
    @ApiProperty()
    readonly phone: string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    readonly address: string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    readonly website: string;
}
