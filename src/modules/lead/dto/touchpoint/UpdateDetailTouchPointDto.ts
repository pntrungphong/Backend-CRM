'use strict';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEnum, IsOptional } from 'class-validator';

import { TypeTouchPoint } from '../../../../common/constants/type-touchpoint';
import { UpdateTaskDto } from '../task/UpdateTaskDto';

export class UpdateDetailTouchPointDto {
    @IsOptional()
    @ApiProperty()
    goal: string;

    @IsEnum(TypeTouchPoint)
    @IsOptional()
    @ApiProperty({ example: 'LM' })
    lane: string;

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

    @IsArray()
    @IsOptional()
    @ApiProperty({ type: [UpdateTaskDto] })
    task: UpdateTaskDto[];
}
