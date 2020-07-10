import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '../auth/auth.module';
import { TouchPointRepository } from './touchPoint.repository';
import { TouchPointController } from './touchPoint.controller';
import { TouchPointService } from './touchPoint.service';
import { NoteTouchPointRepository } from './NoteTouchPoint/noteTouchPoint.repository';
import { NoteTouchPointService } from './NoteTouchPoint/noteTouchPoint.service';


@Module({
    imports: [
        forwardRef(() => AuthModule),
        TypeOrmModule.forFeature([
            TouchPointRepository,
            NoteTouchPointRepository
        ]),
    ],
    controllers: [TouchPointController],
    exports: [TouchPointService],
    providers: [TouchPointService,NoteTouchPointService],
})
export class TouchPointModule {}
