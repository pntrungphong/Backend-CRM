'use strict';

import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class LinkTouchPointFileDto {
    @IsOptional()
    @ApiProperty()
    fileId: number;
    @IsOptional()
    @ApiProperty()
    type: string;
    @IsOptional()
    @ApiProperty()
    note: string;
}
