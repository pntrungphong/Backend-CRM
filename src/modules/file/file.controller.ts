'use strict';

import {
    Controller,
    Get,
    HttpCode,
    HttpException,
    HttpStatus,
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
import { FileDto } from './dto/fileDto';
import { FileService } from './file.service';
@Controller('file')
@ApiTags('file')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(AuthUserInterceptor)
@ApiBearerAuth()
export class FileController {
    constructor(private _service: FileService) { }

    @Post()
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({ type: FileDto, description: 'Successfully Registered' })
    @ApiConsumes('multipart/form-data')
    @ApiFile('file')
    @UseInterceptors(
        AnyFilesInterceptor({
            storage: diskStorage({
                destination: './uploads',
                filename: (req, file, cb) => {
                    try {
                        const fileName = uuid();
                        return cb(
                            null,
                            `${fileName}${extname(file.originalname)}`,
                        );
                    } catch (err) {
                        return cb(
                            new HttpException(
                                'Errored at upload',
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
        const uploadedFile = await this._service.upload(files[0], user);
        return uploadedFile.toDto() as FileDto;
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({
        status: HttpStatus.OK,
        description: 'Get file by id',
    })
    async getFileById(@Param('id') id: string, @Res() res: Response) {
        const path = await this._service.getFileById(id);
        return res.sendFile(`${path}`, { root: './' });
    }
}
