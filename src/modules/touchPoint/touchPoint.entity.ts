import {
    Column,
    Entity,

    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
    OneToMany,
} from 'typeorm';
import { TouchPointDto } from './dto/TouchPointDto';
import { AbstractEntity } from '../../common/abstract.entity';
import { LeadEntity } from '../lead/lead.entity';
import { NoteTouchPointEntity } from './NoteTouchPoint/noteTouchPoint.entity';
import { NoteEntity } from 'modules/lead/note/note.entity';


@Entity({ name: 'touchPoint' })
export class TouchPointEntity extends AbstractEntity<TouchPointDto> {
    @Column({ nullable: true, type: 'jsonb' })
    goal: string;
    @Column({ nullable: false })
    rank: number;
    @Column({ nullable: false,name:'meetingDate' })
    meetingDate: Date;
    @Column({nullable: false,name:'lead_id'})
    idLead:number;
    @Column({ nullable: false, name: 'created_by' })
    createdBy: string;
    @Column({ nullable: false, name: 'updated_by' })
    updatedBy: string;
    @ManyToOne(() => LeadEntity, (lead) => lead.touchPoint)
    @JoinColumn({
        name: 'lead_id',
    })
    lead: LeadEntity;
    @OneToMany(() => NoteTouchPointEntity, (note) => note.touchPoint)
    @JoinColumn({
        name: 'touchPoint_id',
    })
    note: NoteTouchPointEntity[];

    dtoClass= TouchPointDto;
}
