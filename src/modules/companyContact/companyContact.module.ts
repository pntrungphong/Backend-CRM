import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '../auth/auth.module';
import { CompanyContactRepository } from './companyContact.repository';
import { LinkCompanyContactService } from './companyContact.service';

@Module({
    imports: [
        forwardRef(() => AuthModule),
        TypeOrmModule.forFeature([CompanyContactRepository]),
    ],
    exports: [LinkCompanyContactService],
    providers: [LinkCompanyContactService],
})
export class CompanyContactModule {}
