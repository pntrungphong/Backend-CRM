import { HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';

import { NoteFileTouchPointDto } from '../../../../modules/lead/dto/fileTouchPoint/NoteFileTouchPoint';
import { TouchPointFileEntity } from '../../entity/Touchpoint_file/fileTouchPoint.entity';
@EntityRepository(TouchPointFileEntity)
export class TouchPointFileRepository extends Repository<TouchPointFileEntity> {
    async updateNote(
        noteFile: NoteFileTouchPointDto,
        fileTouchPointId: number,
    ): Promise<TouchPointFileEntity> {
        const fileTouchPoint = await this.findOne({
            where: { fileId: fileTouchPointId },
        });
        if (!fileTouchPoint) {
            throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        }
        const updatedNoteFile = Object.assign(fileTouchPoint, {
            ...noteFile,
        });

        return this.save(updatedNoteFile);
    }
}
