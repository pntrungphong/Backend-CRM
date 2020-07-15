'use strict';

import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class TouchPointFileDto {
    @IsOptional()
    @ApiProperty()
    fileId: number;

    @IsOptional()
    @ApiProperty()
    touchPointId: number;

    @IsOptional()
    @ApiProperty()
    leadId: number;

    @IsOptional()
    @ApiProperty()
    type: string;
    @IsOptional()
    @ApiProperty()
    note: string;

    constructor(
        fileId: number,
        touchPointId: number,
        leadId: number,
        type: string,
        note: string,
    ) {
        this.fileId = fileId;
        this.touchPointId = touchPointId;
        this.leadId = leadId;
        this.type = type;
        this.note = note;
    }
}
