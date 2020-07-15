import { Injectable } from '@nestjs/common';

import { LinkTouchPointFileDto } from '../../../lead/dto/fileTouchPoint/LinkFileDto';
import { TouchPointFileDto } from '../../dto/fileTouchPoint/TouchPointFileDto';
import { TouchPointFileRepository } from '../../repository/TouchpointFile/fileTouchPoint.repository';

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
    async updateFileTouchPoint(
        touchPointFile: LinkTouchPointFileDto[],
        touchPointId: number,
        leadId: number,
    ): Promise<void> {
        const relations = await this.relationRepository.find({
            touchPointId,
        });
        await this.relationRepository.remove(relations);
        const fileTouchPointClean = touchPointFile.map((it) => ({
            leadId,
            touchPointId,
            fileId: it.fileId,
            type: it.type,
            note: it.note,
        }));
        await this.createFileTouchPoint(
            fileTouchPointClean,
            touchPointId,
            leadId,
        );
    }
    async createRelation(relationObj: TouchPointFileDto): Promise<void> {
        const relation = this.relationRepository.create({ ...relationObj });
        await this.relationRepository.save(relation);
    }
}
