'use strict';

import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class InfoStatusDto {
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    readonly status?: string = '';
}
