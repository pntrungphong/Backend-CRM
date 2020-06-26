import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '../auth/auth.module';
import { CompanyContactModule } from '../company-contact/companyContact.module';
import { CompanyController } from './company.controller';
import { CompanyRepository } from './company.repository';
import { CompanyService } from './company.service';
import { TagCompanyRepository } from './tagcompany.repository';
import { TagCompanyService } from './tagcompany.service';

@Module({
    imports: [
        CompanyContactModule,
        forwardRef(() => AuthModule),
        TypeOrmModule.forFeature([CompanyRepository, TagCompanyRepository]),
    ],
    controllers: [CompanyController],
    exports: [CompanyService],
    providers: [CompanyService, TagCompanyService],
})
export class CompanyModule {}
