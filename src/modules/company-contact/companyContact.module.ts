import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '../auth/auth.module';
import { CompanyRepository } from '../company/company.repository';
import { CompanyContactRepository } from './companyContact.repository';
import { CompanyContactService } from './companyContact.service';

@Module({
    imports: [
        forwardRef(() => AuthModule),
        TypeOrmModule.forFeature([CompanyContactRepository, CompanyRepository]),
    ],
    exports: [CompanyContactService],
    providers: [CompanyContactService],
})
export class CompanyContactModule {}
