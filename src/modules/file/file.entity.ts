import { Column, Entity } from 'typeorm';

import { AbstractEntity } from '../../common/abstract.entity';
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

    @Column({ nullable: true, name: 'lead_id' })
    idLead: string;

    @Column({ nullable: false, name: 'created_by' })
    createdBy: string;

    @Column({ nullable: false, name: 'updated_by' })
    updatedBy: string;

    dtoClass = FileDto;
}
