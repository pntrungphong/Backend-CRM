'use strict';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class UpdateTouchPointMarkDoneDto {
    @IsOptional()
    @ApiProperty()
    status: string;

    @IsOptional()
    @ApiProperty()
    review: string;

    @IsOptional()
    @ApiProperty()
    actualDate: Date;
}
