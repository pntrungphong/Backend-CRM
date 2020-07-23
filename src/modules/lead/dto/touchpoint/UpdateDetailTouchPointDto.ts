'use strict';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsNumber, IsOptional } from 'class-validator';

import { LinkTouchPointFileDto } from '../fileTouchPoint/LinkFileDto';
import { TouchPointFileDto } from '../fileTouchPoint/TouchPointFileDto';

export class UpdateDetailTouchPointDto {
    @IsOptional()
    @ApiProperty()
    goal: string;


    @IsOptional()
    @ApiProperty()
    note: string;

    @IsOptional()
    @ApiProperty()
    review: string;

    @IsOptional()
    @ApiProperty()
    meetingDate: Date;


    @IsArray()
    @IsOptional()
    @ApiProperty({ type: [LinkTouchPointFileDto] })
    file: TouchPointFileDto[];
}
