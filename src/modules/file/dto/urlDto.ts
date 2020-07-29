'use strict';

import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class UrlDto {
    @IsNotEmpty()
    @IsString()
    @ApiPropertyOptional()
    name: string;

    @IsNotEmpty()
    @IsString()
    @ApiPropertyOptional()
    url: string;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional()
    note: string;

    @IsNotEmpty()
    @IsString()
    @ApiPropertyOptional()
    fileTouchPointId: string;

  
}
