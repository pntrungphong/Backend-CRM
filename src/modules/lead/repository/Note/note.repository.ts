import { AbstractRepository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';

import { NoteDto } from '../../dto/note/NoteDto';
import { NoteEntity } from '../../entity/Note/note.entity';
@EntityRepository(NoteEntity)
export class NoteRepository extends AbstractRepository<NoteEntity> {
    public async create(
        createNoteDto: NoteDto[],
        idLead: string,
    ): Promise<void> {
        for await (const note of createNoteDto) {
            const noteObj = { ...note, idLead };
            const newnote = this.repository.create({
                ...noteObj,
            });
            await this.repository.save(newnote);
        }
    }

    public async update(notes: NoteDto[], idLead: string): Promise<void> {
        const updateNotes = await this.repository.find({ idLead });
        console.table(updateNotes);
        await this.repository.remove(updateNotes);
        const noteClean = notes.map((it) => ({
            title: it.title,
            content: it.content,
        }));
        await this.create(noteClean, idLead);
    }
}
