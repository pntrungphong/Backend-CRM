'use strict';
import { ApiProperty } from '@nestjs/swagger';
import {  IsOptional, IsEnum, IsString } from 'class-validator';
import { StatusTouchPoint } from '../../../../common/constants/status-touchpoint';


export class UpdateTouchPointMarkDoneDto {
    @IsEnum(StatusTouchPoint)
    @IsString()
    @ApiProperty()
    status: string;

    @IsOptional()
    @ApiProperty()
    review: string;

    @IsOptional()
    @ApiProperty()
    actualDate: Date;
}
