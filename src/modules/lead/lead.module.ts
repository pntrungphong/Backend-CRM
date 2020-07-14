import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '../auth/auth.module';
import { CompanyRepository } from '../client/repository/company.repository';
import { LeadController } from './controller/lead.controller';
import { TouchPointController } from './controller/touchpoint.controller';
import { LeadRepository } from './repository/Lead/lead.repository';
import { NoteRepository } from './repository/Note/note.repository';
import { TaskRepository } from './repository/Task/task.repository';
import { TouchPointFileRepository } from './repository/Touchpoint_file/fileTouchPoint.repository';
import { TouchPointRepository } from './repository/Touchpoint/touchpoint.repository';
import { LeadService } from './service/Lead/lead.service';
import { NoteService } from './service/Note/note.service';
import { TouchPointService } from './service/Note/touchpoint.service';
import { TaskService } from './service/Task/task.service';
import { TouchPointFileService } from './service/TouchPoint_file/fileTouchPoint.service';

@Module({
    imports: [
        forwardRef(() => AuthModule),
        TypeOrmModule.forFeature([
            LeadRepository,
            CompanyRepository,
            NoteRepository,
            TouchPointRepository,
            TouchPointFileRepository,
            TaskRepository,
        ]),
    ],
    controllers: [LeadController, TouchPointController],
    exports: [
        LeadService,
        NoteService,
        TouchPointService,
        TouchPointFileService,
    ],
    providers: [
        LeadService,
        NoteService,
        TouchPointService,
        TouchPointFileService,
        TaskService,
    ],
})
export class LeadModule {}
