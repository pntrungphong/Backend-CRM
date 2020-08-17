import { Injectable, Logger } from '@nestjs/common';

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
import { UserDto } from '../../../../modules/user/dto/UserDto';
import { UserEntity } from '../../../../modules/user/user.entity';

@Injectable()
export class TouchPointFileService {
    public logger = new Logger(TouchPointFileService.name);
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
        const updateNote = this.relationRepository.updateNote(
            noteFile,
            fileTouchPointId,
        );
        return updateNote;
    }
    async createRelation(relationObj: TouchPointFileDto): Promise<void> {
        const relation = this.relationRepository.create({ ...relationObj });
        await this.relationRepository.save(relation);
    }

    async getList(leadId: string): Promise<InfoFileTouchPointDto[]> {
        const file = await this.relationRepository.find({
            where: { leadId },
            relations: ['file', 'touchPoint', 'file.user'],
        });
        this.logger.log(file);
        const listFile = [];
        file.forEach((it) => {
            const fileTouchPoint = new InfoFileTouchPointDto(it);
            const detailFile = new FileDto(fileTouchPoint.file as FileEntity);
            const detailUser = new UserDto(
                fileTouchPoint.file.user as UserEntity,
            );
            const touchPoint = new OrderTouchPointDto(
                fileTouchPoint.touchPoint as TouchPointEntity,
            );
            detailFile.user = detailUser;
            fileTouchPoint.file = detailFile;
            fileTouchPoint.touchPoint = touchPoint;
            listFile.push(fileTouchPoint);
        });
        return listFile;
    }
}
