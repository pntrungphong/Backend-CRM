import { AbstractRepository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';

import { FileDto } from './dto/fileDto';
import { FileEntity } from './file.entity';

@EntityRepository(FileEntity)
export class FileRepository extends AbstractRepository<FileEntity> {
    public async create(fileDto: FileDto): Promise<FileEntity> {
        const fileData = this.repository.create(fileDto);
        return this.repository.save(fileData);
    }

    public async getById(id: string): Promise<FileEntity> {
        return this.repository.findOne({ id });
    }
}
