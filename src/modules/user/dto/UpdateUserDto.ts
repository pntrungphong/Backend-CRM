'use strict';

import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateUserDto {
    @IsString()
    @ApiPropertyOptional()
    oldPass: string;

    @IsString()
    @ApiPropertyOptional()
    newPass: string;
}
