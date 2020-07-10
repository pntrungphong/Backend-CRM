import {
    Column,
    Entity,

    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { TouchPointEntity } from '../touchPoint.entity';


@Entity({ name: 'noteTouchPoint' })
export class NoteTouchPointEntity  {
    @PrimaryGeneratedColumn('uuid')
    id:number;
    @Column({ nullable: false })
    title: string;
    @Column({ nullable: false })
    content: string;
    @Column({nullable: false,name:'touchPoint_id'})
    idTouchPoint:string;
    @ManyToOne(() => TouchPointEntity, (touchPoint) => touchPoint.note)
    @JoinColumn({
        name: 'touchPoint_id',
    })
    touchPoint: TouchPointEntity;
}
