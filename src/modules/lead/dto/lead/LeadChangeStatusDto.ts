'use strict';

import {ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';
import {IsOptional} from 'class-validator';

export class LeadChangeStatusDto {
    @IsOptional()
    @ApiPropertyOptional()
    status: string;
}
