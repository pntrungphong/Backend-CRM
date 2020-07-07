import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '../auth/auth.module';
import { LeadController } from './lead.controller';
import { LeadRepository } from './lead.repository';
import { LeadService } from './lead.service';
import { NoteRepository } from './note/note.repository';
import { NoteService } from './note/note.service';
import { CompanyRepository } from '../client/repository/company.repository';

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
