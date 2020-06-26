import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '../auth/auth.module';
import { CompanyContactRepository } from './companyContact.repository';
import { CompanyContactService } from './companyContact.service';

@Module({
    imports: [
        forwardRef(() => AuthModule),
        TypeOrmModule.forFeature([CompanyContactRepository]),
    ],
    exports: [CompanyContactService],
    providers: [CompanyContactService],
})
export class CompanyContactModule {}
