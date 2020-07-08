'use strict';

import { ApiPropertyOptional } from '@nestjs/swagger';

import { AbstractDto } from '../../../common/dto/AbstractDto';
import { FileEntity } from '../file.entity';

export class FileDto extends AbstractDto {
    @ApiPropertyOptional()
    originalname: string;

    @ApiPropertyOptional()
    path: string;

    @ApiPropertyOptional()
    mimetype: string;

    @ApiPropertyOptional()
    filename: string;

    @ApiPropertyOptional()
    destination: string;

    @ApiPropertyOptional()
    idLead: string;

    @ApiPropertyOptional()
    createdBy: string;

    @ApiPropertyOptional()
    updatedBy: string;

    constructor(fileEntity: FileEntity) {
        super(fileEntity);
        this.originalname = fileEntity.originalname;
        this.path = fileEntity.path;
        this.mimetype = fileEntity.mimetype;
        this.filename = fileEntity.filename;
        this.destination = fileEntity.destination;
        this.idLead = fileEntity.idLead;
        this.createdBy = fileEntity.createdBy;
        this.updatedBy = fileEntity.updatedBy;
    }
}
