import { Injectable } from '@nestjs/common';

import { TouchPointFileDto } from '../dto/fileTouchPointDto';
import { TouchPointFileRepository } from './fileTouchPoint.repository';

@Injectable()
export class TouchPointFileService {
    constructor(public readonly relationRepository: TouchPointFileRepository) {}

    async createFileTouchPoint(
        files: TouchPointFileDto[],
        idTouchPoint: number,
        idLead: number,
    ): Promise<void> {
        for await (const file of files) {
            const relationObj = new TouchPointFileDto(
                file.idFile,
                idTouchPoint,
                idLead,
                file.type,
                file.note,
            );
            await this.createRelation(relationObj);
        }
    }
    async createRelation(relationObj: TouchPointFileDto): Promise<void> {
        const relation = this.relationRepository.create({ ...relationObj });
        await this.relationRepository.save(relation);
    }
}
