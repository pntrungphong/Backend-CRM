import { Injectable } from '@nestjs/common';

import { UserEntity } from '../user/user.entity';
import { FileDto } from './dto/fileDto';
import { FileEntity } from './file.entity';
import { FileRepository } from './file.repository';

@Injectable()
export class FileService {
    constructor(public readonly repository: FileRepository) {}

    async upload(file: FileDto, user: UserEntity): Promise<FileEntity> {
        const fileData = Object.assign(file, {
            createdBy: user.id,
            updatedBy: user.id,
        });
        return this.repository.create(fileData);
    }

    async getFileById(id: string): Promise<FileEntity> {
        return this.repository.getById(id);
    }
}
