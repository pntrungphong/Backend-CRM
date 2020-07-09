import { Column, Entity, JoinColumn, OneToMany } from 'typeorm';

import { AbstractEntity } from '../../common/abstract.entity';
import { LeadFileEntity } from '../lead/lead-file/lead-file.entity';
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

    @OneToMany(() => LeadFileEntity, (leadFile) => leadFile.file)
    @JoinColumn()
    leadFile: LeadFileEntity[];

    dtoClass = FileDto;
}
