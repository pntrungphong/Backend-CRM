'use strict';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString } from 'class-validator';
export class TagDto {
    @IsString()
    @ApiPropertyOptional()
    id: string;

    @IsString()
    @ApiPropertyOptional()
    tag: string;
}
