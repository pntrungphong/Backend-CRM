'use strict';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsNumber, IsOptional } from 'class-validator';

import { LinkTouchPointFileDto } from '../fileTouchPoint/LinkFileDto';
import { TouchPointFileDto } from '../fileTouchPoint/TouchPointFileDto';
import { TaskDto } from '../task/TaskDto';

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
    leadId: number;

    @IsArray()
    @IsOptional()
    @ApiProperty({ type: [LinkTouchPointFileDto] })
    file: TouchPointFileDto[];

    @IsArray()
    @IsOptional()
    @ApiProperty({ type: [TaskDto] })
    task: TaskDto[];
}
