import { AbstractRepository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';
import { NoteTouchPointEntity } from './noteTouchPoint.entity';
import { NoteTouchPointUpdateDto } from './dto/NoteUpdateDto';

@EntityRepository(NoteTouchPointEntity)
export class NoteTouchPointRepository extends AbstractRepository<NoteTouchPointEntity> {
    public async create(
        createNoteDto: NoteTouchPointUpdateDto[],
        idTouchPoint: string,
    ): Promise<void> {
        for await (const note of createNoteDto) {
            console.table(idTouchPoint)
            const noteObj = { ...note, idTouchPoint };
            const newnote = this.repository.create({
                ...noteObj,
                idTouchPoint:idTouchPoint,
            });
            await this.repository.save(newnote);
        }
    }

    // public async update(notes: NoteDto[], idLead: string): Promise<void> {
    //     const updateNotes = await this.repository.find({ idLead });
    //     console.table(updateNotes);
    //     await this.repository.remove(updateNotes);
    //     const noteClean = notes.map((it) => ({
    //         title: it.title,
    //         content: it.content,
    //     }));
    //     await this.create(noteClean, idLead);
    // }
}
