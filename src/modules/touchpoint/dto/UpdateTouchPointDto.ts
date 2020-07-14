'use strict';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsNumber, IsOptional } from 'class-validator';

import { TouchPointFileDto } from '../../file/dto/fileTouchPointDto';
import { LinkTouchPointFileDto } from '../../file/dto/LinkFileDto';

export class UpdateTouchPointDto {
    @IsOptional()
    @ApiProperty()
    order: number;

    @IsOptional()
    @ApiProperty()
    goal: string;

    @IsOptional()
    @ApiProperty()
    status: string;

    @IsOptional()
    @ApiProperty()
    note: string;

    @IsOptional()
    @ApiProperty()
    meetingDate: Date;

    @IsNumber()
    @ApiPropertyOptional()
    idLead: number;

    @IsArray()
    @IsOptional()
    @ApiProperty({ type: [LinkTouchPointFileDto] })
    file: TouchPointFileDto[];
}
