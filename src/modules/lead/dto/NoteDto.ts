'use strict';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString } from 'class-validator';
export class NoteDto {
    @IsString()
    @ApiPropertyOptional()
    title: string;

    @IsString()
    @ApiPropertyOptional()
    content: string;
}
