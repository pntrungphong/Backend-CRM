'use strict';

import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpException,
    HttpStatus,
    Logger,
    Param,
    Post,
    Res,
    UploadedFiles,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import {
    ApiBearerAuth,
    ApiConsumes,
    ApiOkResponse,
    ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuid } from 'uuid';

import { AuthUser } from '../../decorators/auth-user.decorator';
import { ApiFile } from '../../decorators/swagger.schema';
import { AuthGuard } from '../../guards/auth.guard';
import { RolesGuard } from '../../guards/roles.guard';
import { AuthUserInterceptor } from '../../interceptors/auth-user-interceptor.service';
import { UserEntity } from '../user/user.entity';
import { AttachmentDto } from './dto/attachmentDto';
import { FileDto } from './dto/fileDto';
import { UrlDto } from './dto/urlDto';
import { FileEntity } from './file.entity';
import { FileService } from './file.service';

@Controller('file')
@ApiTags('file')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(AuthUserInterceptor)
@ApiBearerAuth()
export class FileController {
    public logger = new Logger(FileController.name);
    constructor(private _service: FileService) {}

    @Post()
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({ type: FileDto, description: 'Successfully Registered' })
    @ApiConsumes('multipart/form-data')
    @ApiFile('file')
    @UseInterceptors(
        AnyFilesInterceptor({
            storage: diskStorage({
                destination: './uploads',
                fileName: (req, file, cb) => {
                    try {
                        const fileName = uuid();
                        this.logger.log('Post file');

                        return cb(
                            null,
                            `${fileName}${extname(file.originalname)}`,
                        );
                    } catch (err) {
                        return cb(
                            new HttpException(
                                'Error at upload',
                                HttpStatus.BAD_REQUEST,
                            ),
                        );
                    }
                },
            }),
        }),
    )
    async uploadFile(
        @UploadedFiles() files: FileDto,
        @AuthUser() user: UserEntity,
    ): Promise<FileDto> {
        return this._service.upload(files[0], user);
    }

    @Post('url')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({ type: UrlDto, description: 'Successfully Registered' })
    async uploadUrl(
        @Body() urls: UrlDto,
        @AuthUser() user: UserEntity,
    ): Promise<FileEntity> {
        return this._service.uploadUrl(urls, user);
    }

    @Post('attachment')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({
        type: AttachmentDto,
        description: 'Successfully Registered',
    })
    async uploadAttachment(
        @Body() attachment: AttachmentDto,
    ): Promise<FileEntity> {
        return this._service.uploadAttachment(attachment);
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({
        status: HttpStatus.OK,
        description: 'Get file by id',
    })
    async getFileById(@Param('id') id: string, @Res() res: Response) {
        const fileEntity = await this._service.getFileById(id);
        return res.sendFile(`${fileEntity.path}`, { root: './' });
    }

    @Get(':id/download')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({
        status: HttpStatus.OK,
        description: 'Get file by id',
    })
    async downloadFile(@Param('id') id: string, @Res() res: Response) {
        const fileEntity = await this._service.getFileById(id);
        return res.download(`./${fileEntity.path}`, fileEntity.originalname);
    }
}
