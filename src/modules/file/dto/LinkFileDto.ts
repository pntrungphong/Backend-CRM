'use strict';

import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class LinkTouchPointFileDto {
    @IsOptional()
    @ApiProperty()
    idFile: number;
    @IsOptional()
    @ApiProperty()
    type: string;
    @IsOptional()
    @ApiProperty()
    note: string;
}
