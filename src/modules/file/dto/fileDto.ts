'use strict';

import { AbstractDto } from '../../../common/dto/AbstractDto';
import { FileEntity } from '../file.entity';

export class FileDto extends AbstractDto {
    originalname: string;
    path: string;
    mimetype: string;
    filename: string;
    destination: string;

    constructor(fileEntity: FileEntity) {
        super(fileEntity);
        this.originalname = fileEntity.originalname;
        this.path = fileEntity.path;
        this.mimetype = fileEntity.mimetype;
        this.filename = fileEntity.filename;
        this.destination = fileEntity.destination;
    }
}
