import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '../auth/auth.module';
import { TouchPointFileRepository } from '../file/fileTouchPoint/fileTouchPoint.repository';
import { TouchPointFileService } from '../file/fileTouchPoint/fileTouchPoint.service';
import { TouchPointController } from './touchpoint.controller';
import { TouchPointRepository } from './touchpoint.repository';
import { TouchPointService } from './touchpoint.service';

@Module({
    imports: [
        forwardRef(() => AuthModule),
        TypeOrmModule.forFeature([
            TouchPointRepository,
            TouchPointFileRepository,
        ]),
    ],
    controllers: [TouchPointController],
    exports: [TouchPointService, TouchPointFileService],
    providers: [TouchPointService, TouchPointFileService],
})
export class TouchPointModule {}
