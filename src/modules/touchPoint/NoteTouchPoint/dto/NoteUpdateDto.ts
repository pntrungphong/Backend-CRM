'use strict';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsArray } from 'class-validator';
export class NoteTouchPointUpdateDto  {
    @IsString()
    @ApiPropertyOptional()
    title: string;

    @IsString()
    @ApiPropertyOptional()
    content: string;
    
}
