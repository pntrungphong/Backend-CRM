'use strict';

import { ApiPropertyOptional } from '@nestjs/swagger';

import { FileDto } from '../../../../modules/file/dto/fileDto';
import { TouchPointFileEntity } from '../../../../modules/lead/entity/Touchpoint_file/fileTouchPoint.entity';

export class InfoFileTouchPointDto {
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

    constructor(touchpointFile: TouchPointFileEntity) {
        this.fileId = touchpointFile.fileId;
        this.touchPointId = touchpointFile.touchPointId;
        this.leadId = touchpointFile.leadId;
        this.type = touchpointFile.type;
        this.note = touchpointFile.note;
        this.file = touchpointFile.file;
    }
}
