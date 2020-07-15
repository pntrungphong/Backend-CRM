import { Injectable } from '@nestjs/common';

import { NoteDto } from '../../dto/note/NoteDto';
import { NoteRepository } from '../../repository/Note/note.repository';
@Injectable()
export class NoteService {
    constructor(public readonly noteRepository: NoteRepository) {}

    async create(createNoteDto: NoteDto[], idLead: string): Promise<void> {
        await this.noteRepository.create(createNoteDto, idLead);
    }

    async update(notes: NoteDto[], idLead: string): Promise<void> {
        await this.noteRepository.update(notes, idLead);
    }
}
