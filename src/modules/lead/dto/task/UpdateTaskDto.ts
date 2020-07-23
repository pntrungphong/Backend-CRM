'use strict';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class UpdateTaskDto {
    @IsOptional()
    @ApiPropertyOptional()
    taskName: string;

    @IsOptional()
    @ApiPropertyOptional()
    type: string;

    @IsOptional()
    @ApiPropertyOptional()
    userId: string;

    @IsOptional()
    @ApiPropertyOptional()
    dueDate: Date;
}
