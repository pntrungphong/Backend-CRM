import { Injectable } from '@nestjs/common';

import { NoteTouchPointRepository } from './noteTouchPoint.repository';
import { NoteTouchPointUpdateDto } from './dto/NoteUpdateDto';
@Injectable()
export class NoteTouchPointService {
    constructor(public readonly noteTouchPointRepository: NoteTouchPointRepository) {}

    async create(createNoteDto: NoteTouchPointUpdateDto[], idTouchPoint: string): Promise<void> {
        await this.noteTouchPointRepository.create(createNoteDto, idTouchPoint);
    }

}
