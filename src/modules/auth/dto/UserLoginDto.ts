'use strict';

import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class UserLoginDto {
    @IsString()
    @IsEmail()
    @ApiProperty({
        example: 'admin@gu.io',
    })
    readonly email: string;

    @IsString()
    @ApiProperty({
        example: 'gu123451',
    })
    readonly password: string;
}
