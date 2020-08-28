import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '../auth/auth.module';
import { CompanyController } from './controller/company.controller';
import { ContactController } from './controller/contact.controller';
import { CompanyRepository } from './repository/company.repository';
import { CompanyContactRepository } from './repository/companyContact.repository';
import { ContactRepository } from './repository/contact.repository';
import { ContactReferralRepository } from './repository/referral.repository';
import { CompanyService } from './service/company.service';
import { CompanyContactService } from './service/companyContact.service';
import { ContactService } from './service/contact.service';
import { ContactReferralService } from './service/referral.service';
import { TagRepository } from '../tag/tag.repository';
import { LeadRepository } from '../lead/repository/Lead/lead.repository';
import { NoteRepository } from '../lead/repository/Note/note.repository';
import { TouchPointRepository } from '../lead/repository/Touchpoint/touchpoint.repository';
import { TouchPointFileRepository } from '../lead/repository/TouchpointFile/fileTouchPoint.repository';
import { TaskRepository } from '../lead/repository/Task/task.repository';
import { LeadController } from '../lead/controller/lead.controller';
import { TouchPointController } from '../lead/controller/touchpoint.controller';
import { TaskController } from '../lead/controller/task.controller';
import { FileTouchPointController } from '../lead/controller/fileTouchPoint.controller';
import { LeadService } from '../lead/service/Lead/lead.service';
import { NoteService } from '../lead/service/Note/note.service';
import { TouchPointService } from '../lead/service/TouchPoint/touchpoint.service';
import { TouchPointFileService } from '../lead/service/TouchPoint_file/fileTouchPoint.service';
import { TaskService } from '../lead/service/Task/task.service';
import { LogRepository } from '../log/repository/log.repository';

@Module({
    imports: [
        forwardRef(() => AuthModule),
        TypeOrmModule.forFeature([
            ContactRepository,
            CompanyRepository,
            CompanyContactRepository,
            ContactReferralRepository,
            TagRepository,
            LeadRepository,
            NoteRepository,
            TouchPointRepository,
            TouchPointFileRepository,
            TaskRepository,
            LogRepository,
        ]),
    ],
    controllers: [
        ContactController,
        CompanyController,
        LeadController,
        TouchPointController,
        TaskController,
        FileTouchPointController,
    ],
    exports: [
        CompanyService,
        ContactService,
        ContactReferralService,
        CompanyContactService,
        LeadService,
        NoteService,
        TouchPointService,
        TouchPointFileService,
    ],
    providers: [
        CompanyService,
        ContactService,
        ContactReferralService,
        CompanyContactService,
        LeadService,
        NoteService,
        TouchPointService,
        TouchPointFileService,
        TaskService,
    ],
})
export class ClientModule {}
