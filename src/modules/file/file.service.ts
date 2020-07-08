import { Injectable } from '@nestjs/common';

import { UserEntity } from '../user/user.entity';
import { FileDto } from './dto/fileDto';
import { FileEntity } from './file.entity';
import { FileRepository } from './file.repository';

@Injectable()
export class FileService {
    constructor(public readonly repository: FileRepository) {}

    async upload(file: FileDto, user: UserEntity): Promise<FileEntity> {
        file.createdBy = user.id;
        file.updatedBy = user.id;
        return this.repository.create(file);
    }

    async getById(id: string): Promise<FileEntity> {
        return this.repository.getById(id);
    }

    async getFileById(id: string): Promise<string> {
        return (await this.repository.getById(id)).path;
    }
}
