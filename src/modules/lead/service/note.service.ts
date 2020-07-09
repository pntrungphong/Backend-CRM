import { Injectable } from '@nestjs/common';

import { NoteDto } from '../dto/NoteDto';
import { NoteRepository } from '../repository/note.repository';
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
