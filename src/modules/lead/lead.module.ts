import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '../auth/auth.module';
import { CompanyRepository } from '../client/repository/company.repository';
import { LeadController } from './lead.controller';
import { LeadRepository } from './repository/lead.repository';
import { NoteRepository } from './repository/note.repository';
import { LeadService } from './service/lead.service';
import { NoteService } from './service/note.service';

@Module({
    imports: [
        forwardRef(() => AuthModule),
        TypeOrmModule.forFeature([
            LeadRepository,
            CompanyRepository,
            NoteRepository,
        ]),
    ],
    controllers: [LeadController],
    exports: [LeadService, NoteService],
    providers: [LeadService, NoteService],
})
export class LeadModule {}
