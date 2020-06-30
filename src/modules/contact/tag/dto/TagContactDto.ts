'use strict';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString } from 'class-validator';
export class TagContactDto {
    @IsString()
    @ApiPropertyOptional()
    tag: string;
}
