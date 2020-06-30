import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '../auth/auth.module';
import { CompanyRepository } from '../company/company.repository';
import { ContactRepository } from '../contact/contact.repository';
import { CompanyContactRepository } from './companyContact.repository';
import { CompanyContactService } from './companyContact.service';

@Module({
    imports: [
        forwardRef(() => AuthModule),
        TypeOrmModule.forFeature([
            CompanyContactRepository,
            CompanyRepository,
            ContactRepository,
        ]),
    ],
    exports: [CompanyContactService],
    providers: [CompanyContactService],
})
export class CompanyContactModule {}
