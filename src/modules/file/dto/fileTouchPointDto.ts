'use strict';

import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class TouchPointFileDto {
    @IsOptional()
    @ApiProperty()
    idFile: number;

    @IsOptional()
    @ApiProperty()
    idTouchPoint: number;

    @IsOptional()
    @ApiProperty()
    idLead: number;

    @IsOptional()
    @ApiProperty()
    type: string;
    @IsOptional()
    @ApiProperty()
    note: string;

    constructor(
        idFile: number,
        idTouchPoint: number,
        idLead: number,
        type: string,
        note: string,
    ) {
        this.idFile = idFile;
        this.idTouchPoint = idTouchPoint;
        this.idLead = idLead;
        this.type = type;
        this.note = note;
    }
}
