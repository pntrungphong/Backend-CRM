import {
    Column,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
} from 'typeorm';

import { AbstractEntity } from '../../common/abstract.entity';
import { UserEntity } from '../../modules/user/user.entity';
import { LeadEntity } from '../lead/entity/Lead/lead.entity';
import { TouchPointFileEntity } from '../lead/entity/Touchpoint_file/fileTouchPoint.entity';
import { FileDto } from './dto/fileDto';

@Entity({ name: 'file' })
export class FileEntity extends AbstractEntity<FileDto> {
    @Column({ nullable: true, name: 'original_name' })
    originalname: string;

    @Column({ nullable: true, name: 'path' })
    path: string;

    @Column({ nullable: true, name: 'type' })
    mimetype: string;

    @Column({ nullable: true, name: 'file_name' })
    filename: string;

    @Column({ nullable: true, name: 'destination' })
    destination: string;

    @Column({ nullable: true, name: 'meta' })
    meta: string;

    @Column({ nullable: false, name: 'created_by' })
    createdBy: string;

    @Column({ nullable: false, name: 'updated_by' })
    updatedBy: string;

    @Column({ nullable: false, name: 'url' })
    url: string;

    @Column({ name: 'user_id' })
    userId: string;

    @ManyToMany(() => LeadEntity, { cascade: true })
    @JoinTable({
        name: 'lead_file',
        joinColumn: { name: 'file_id' },
        inverseJoinColumn: { name: 'lead_id' },
    })
    lead: LeadEntity[];
    @OneToMany(
        () => TouchPointFileEntity,
        (fileTouchPoint) => fileTouchPoint.touchPoint,
    )
    @JoinColumn()
    fileTouchPoint: TouchPointFileEntity[];

    @ManyToOne(() => UserEntity)
    @JoinColumn({
        name: 'user_id',
    })
    user: UserEntity;
    dtoClass = FileDto;
}
