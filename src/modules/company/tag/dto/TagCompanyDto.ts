'use strict';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString } from 'class-validator';
export class TagCompanyDto {
    @IsString()
    @ApiPropertyOptional()
    tag: string;
}
