import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '../auth/auth.module';
import { FileTouchPointController } from '../lead/controller/fileTouchPoint.controller';
import { TouchPointFileRepository } from '../lead/repository/TouchpointFile/fileTouchPoint.repository';
import { TouchPointFileService } from '../lead/service/TouchPoint_file/fileTouchPoint.service';
import { FileController } from './file.controller';
import { FileRepository } from './file.repository';
import { FileService } from './file.service';

@Module({
    imports: [
        forwardRef(() => AuthModule),
        TypeOrmModule.forFeature([FileRepository, TouchPointFileRepository]),
    ],
    controllers: [FileController, FileTouchPointController],
    exports: [FileService, TouchPointFileService],
    providers: [FileService, TouchPointFileService],
})
export class FileModule {}
