'use strict';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class UpdateTaskDto {
    @IsOptional()
    @ApiPropertyOptional({ example: 'Setup first meeting' })
    taskName: string;

    @IsOptional()
    @ApiPropertyOptional({ example: 'Proposal Handling' })
    type: string;

    @IsOptional()
    @ApiPropertyOptional({ example: 'b6f0f679-4189-4d02-99d6-c960f238c9f7' })
    userId: string;

    @IsOptional()
    @ApiPropertyOptional()
    dueDate: Date;
}
