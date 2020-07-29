'use strict';

import { ApiPropertyOptional } from '@nestjs/swagger';

import { FileDto } from '../../../file/dto/fileDto';
import { TouchPointFileEntity } from '../../entity/Touchpoint_file/fileTouchPoint.entity';
import { OrderTouchPointDto } from '../fileTouchPoint/OrderTouchPointDto';

export class InfoFileTouchPointDto {
    @ApiPropertyOptional()
    id: number;
    @ApiPropertyOptional()
    fileId: number;

    @ApiPropertyOptional()
    touchPointId: number;
    @ApiPropertyOptional()
    leadId: number;

    @ApiPropertyOptional()
    type: string;
    @ApiPropertyOptional()
    note: string;

    @ApiPropertyOptional({ type: [FileDto] })
    file: FileDto;
    @ApiPropertyOptional({ type: [OrderTouchPointDto] })
    touchPoint: OrderTouchPointDto;

    constructor(touchPointFile: TouchPointFileEntity) {
        this.id = touchPointFile.id;
        this.fileId = touchPointFile.fileId;
        this.touchPointId = touchPointFile.touchPointId;
        this.leadId = touchPointFile.leadId;
        this.type = touchPointFile.type;
        this.note = touchPointFile.note;
        this.file = touchPointFile.file;
        this.touchPoint = touchPointFile.touchPoint;
    }
}
