import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';

import { FileDto } from '../../../../modules/file/dto/fileDto';
import { FileEntity } from '../../../../modules/file/file.entity';
import { OrderTouchPointDto } from '../../../../modules/lead/dto/fileTouchPoint/OrderTouchPointDto';
import { TouchPointFileEntity } from '../../../../modules/lead/entity/Touchpoint_file/fileTouchPoint.entity';
import { TouchPointEntity } from '../../../../modules/lead/entity/Touchpoint/touchpoint.entity';
import { LinkTouchPointFileDto } from '../../../lead/dto/fileTouchPoint/LinkFileDto';
import { NoteFileTouchPointDto } from '../../../lead/dto/fileTouchPoint/NoteFileTouchPoint';
import { TouchPointFileDto } from '../../dto/fileTouchPoint/TouchPointFileDto';
import { InfoFileTouchPointDto } from '../../dto/touchpoint/InfoFileTouchPointDto';
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

    async updateNote(
        noteFile: NoteFileTouchPointDto,
        fileTouchPointId: number,
    ): Promise<TouchPointFileEntity> {
        const fileTouchPoint = await this.relationRepository.findOne({
            where: { id: fileTouchPointId },
        });
        if (!fileTouchPoint) {
            throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        }
        const updatedNoteFile = Object.assign(fileTouchPoint, {
            ...noteFile,
        });

        return this.relationRepository.save(updatedNoteFile);
    }
    async createRelation(relationObj: TouchPointFileDto): Promise<void> {
        const relation = this.relationRepository.create({ ...relationObj });
        await this.relationRepository.save(relation);
    }

    async getList(leadId: string): Promise<InfoFileTouchPointDto[]> {
        const file = await this.relationRepository.find({
            where: { leadId },
            relations: ['file', 'touchPoint'],
        });
        Logger.log('fileTP.sv');
        const listFile = [];
        file.map((it) => {
            const fileTouchPoint = new InfoFileTouchPointDto(it);
            const detailFile = new FileDto(fileTouchPoint.file as FileEntity);
            const touchPoint = new OrderTouchPointDto(
                fileTouchPoint.touchPoint as TouchPointEntity,
            );
            fileTouchPoint.file = detailFile;
            fileTouchPoint.touchPoint = touchPoint;
            listFile.push(fileTouchPoint);
        });
        return listFile;
    }
}
