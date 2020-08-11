import { Injectable, Logger } from '@nestjs/common';

import { MimeTypeFile } from '../../common/constants/mimetype-file';
import { TouchPointFileDto } from '../lead/dto/fileTouchPoint/TouchPointFileDto';
import { TouchPointFileService } from '../lead/service/TouchPoint_file/fileTouchPoint.service';
import { UserEntity } from '../user/user.entity';
import { AttachmentDto } from './dto/attachmentDto';
import { FileDto } from './dto/fileDto';
import { UrlDto } from './dto/urlDto';
import { FileEntity } from './file.entity';
import { FileRepository } from './file.repository';

@Injectable()
export class FileService {
    public logger = new Logger(FileService.name);

    constructor(
        public readonly repository: FileRepository,
        public readonly touchPointFileService: TouchPointFileService,
    ) {}

    async upload(file: FileDto, user: UserEntity): Promise<FileEntity> {
        const fileData = Object.assign(file, {
            createdBy: user.avatar,
            updatedBy: user.avatar,
        });
        return (await this.repository.create(fileData)).toDto() as FileEntity;
    }

    async uploadAttachment(attachmentDto: AttachmentDto): Promise<FileEntity> {
        const fileEntity = await this.repository.getById(attachmentDto.fileId);
        const fileTouchPoint = new TouchPointFileDto(
            parseInt(fileEntity.id, 10),
            attachmentDto.touchPointId,
            attachmentDto.leadId,
            attachmentDto.type,
            attachmentDto.note,
        );

        const fileTouchPoints = [];
        fileTouchPoints.push(fileTouchPoint);
        void this.touchPointFileService.createFileTouchPoint(
            fileTouchPoints,
            attachmentDto.touchPointId,
            attachmentDto.leadId,
        );

        return fileEntity.toDto() as FileEntity;
    }

    async uploadUrl(urlDto: UrlDto, user: UserEntity): Promise<FileEntity> {
        const fileEntity = new FileEntity();
        const file = Object.assign(fileEntity, {
            createdBy: user.avatar,
            updatedBy: user.avatar,
            url: urlDto.url,
            originalname: urlDto.name,
            mimetype: MimeTypeFile.LINK,
        });

        const newFile = await this.repository.create(file);
        const fileTouchPoint = new TouchPointFileDto(
            parseInt(newFile.id, 10),
            urlDto.touchPointId,
            urlDto.leadId,
            urlDto.type,
            urlDto.note,
        );

        const fileTouchPoints = [];
        fileTouchPoints.push(fileTouchPoint);
        void this.touchPointFileService.createFileTouchPoint(
            fileTouchPoints,
            urlDto.touchPointId,
            urlDto.leadId,
        );

        return newFile.toDto() as FileEntity;
    }

    async getFileById(id: string): Promise<FileEntity> {
        return this.repository.getById(id);
    }
}
