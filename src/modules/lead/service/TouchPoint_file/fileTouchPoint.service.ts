import { Injectable } from '@nestjs/common';

import { TouchPointFileDto } from '../../dto/fileTouchPoint/fileTouchPointDto';
import { TouchPointFileRepository } from '../../repository/Touchpoint_file/fileTouchPoint.repository';

@Injectable()
export class TouchPointFileService {
    constructor(public readonly relationRepository: TouchPointFileRepository) {}

    async createFileTouchPoint(
        files: TouchPointFileDto[],
        touchPointId: number,
        leadId: number,
    ): Promise<void> {
        for await (const file of files) {
            const relationObj = new TouchPointFileDto(
                file.fileId,
                touchPointId,
                leadId,
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
