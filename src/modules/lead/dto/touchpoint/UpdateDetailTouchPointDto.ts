'use strict';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsOptional } from 'class-validator';

import { UpdateTaskDto } from '../task/UpdateTaskDto';

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

    @IsOptional()
    @ApiProperty()
    actualDate: Date;

    @IsArray()
    @IsOptional()
    @ApiProperty({ type: [UpdateTaskDto] })
    tasks: UpdateTaskDto[];
}
