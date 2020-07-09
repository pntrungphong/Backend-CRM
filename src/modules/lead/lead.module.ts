import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '../auth/auth.module';
import { CompanyRepository } from '../client/repository/company.repository';
import { FileLeadRepository } from './lead-file/lead-file.repository';
import { LeadController } from './lead.controller';
import { LeadRepository } from './lead.repository';
import { LeadService } from './lead.service';
import { NoteRepository } from './note/note.repository';
import { NoteService } from './note/note.service';

@Module({
    imports: [
        forwardRef(() => AuthModule),
        TypeOrmModule.forFeature([
            LeadRepository,
            CompanyRepository,
            NoteRepository,
            FileLeadRepository,
        ]),
    ],
    controllers: [LeadController],
    exports: [LeadService, NoteService],
    providers: [LeadService, NoteService],
})
export class LeadModule {}
