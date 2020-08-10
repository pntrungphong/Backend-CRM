'use strict';

import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class AttachmentDto {
    @IsNotEmpty()
    @IsString()
    @ApiPropertyOptional()
    fileId: string;

    @IsNotEmpty()
    @IsString()
    @ApiPropertyOptional()
    touchPointId: number;

    @IsNotEmpty()
    @IsString()
    @ApiPropertyOptional()
    leadId: number;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional()
    note: string;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional()
    type: string;
}
