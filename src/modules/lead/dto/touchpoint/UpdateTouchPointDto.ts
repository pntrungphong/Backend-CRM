'use strict';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsNumber, IsOptional } from 'class-validator';

import { LinkTouchPointFileDto } from '../fileTouchPoint/LinkFileDto';
import { TouchPointFileDto } from '../fileTouchPoint/TouchPointFileDto';

export class UpdateTouchPointDto {
    @IsOptional()
    @ApiProperty({example: "complete first meeting"})
    goal: string;

    @IsOptional()
    @ApiProperty()
    status: string;

    @IsOptional()
    @ApiProperty()
    note: string;

    @IsOptional()
    @ApiProperty()
    review: string;

    @IsOptional()
    @ApiProperty()
    meetingDate: Date;

    @IsOptional()
    @ApiProperty()
    actualDate: Date;

    @IsNumber()
    @ApiPropertyOptional()
    leadId: number;

    @IsArray()
    @IsOptional()
    @ApiProperty({ type: [LinkTouchPointFileDto] })
    file: TouchPointFileDto[];
}
