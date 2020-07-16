'use strict';

import { ApiPropertyOptional } from '@nestjs/swagger';

import { FileEntity } from '../../../file/file.entity';

export class InfoFileDto {
    @ApiPropertyOptional()
    name: string;

    @ApiPropertyOptional()
    path: string;

    constructor(file: FileEntity) {
        this.name = file.filename;
        this.path = file.path;
    }
}
