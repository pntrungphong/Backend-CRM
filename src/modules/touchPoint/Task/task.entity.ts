// import {
//     Column,
//     Entity,

//     PrimaryGeneratedColumn,
//     ManyToOne,
//     JoinColumn,
// } from 'typeorm';
// import { TouchPointEntity } from '../touchPoint.entity';


// @Entity({ name: 'task' })
// export class taskEntity  {
//     @PrimaryGeneratedColumn('uuid')
//     id:number;
//     @Column({ nullable: false })
//     name: string;
//     @Column({ nullable: false, type:'jsonb'})
//     task: string;
//     @Column({nullable: false,name:'touchPoint_id'})
//     idTouchPoint:number;
//     @ManyToOne(() => TouchPointEntity, (touchPoint) => touchPoint.note)
//     @JoinColumn({
//         name: 'touchPoint_id',
//     })
//     touchPoint: TouchPointEntity;
// }
