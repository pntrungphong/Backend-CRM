'use strict';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsNumber, IsOptional } from 'class-validator';

import { UpdateTaskDto } from '../task/UpdateTaskDto';

export class UpdateTouchPointDto {
    @IsOptional()
    @ApiProperty({ example: 'complete first meeting' })
    goal: string;

    @IsOptional()
    @ApiProperty({ example: 'Undone' })
    status: string;

    @IsOptional()
    @ApiProperty()
    note: string;

    @IsOptional()
    @ApiProperty({ example: 'PC' })
    lane: string;

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
    @ApiPropertyOptional({ example: 1 })
    leadId: number;

    @IsArray()
    @IsOptional()
    @ApiProperty({ type: [UpdateTaskDto] })
    tasks: UpdateTaskDto[];
}
