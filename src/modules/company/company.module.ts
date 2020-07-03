import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '../auth/auth.module';
import { CompanyContactModule } from '../company-contact/companyContact.module';
import { ContactRepository } from '../contact/contact.repository';
import { CompanyController } from './company.controller';
import { CompanyRepository } from './company.repository';
import { CompanyService } from './company.service';

@Module({
    imports: [
        CompanyContactModule,
        forwardRef(() => AuthModule),
        TypeOrmModule.forFeature([CompanyRepository, ContactRepository]),
    ],
    controllers: [CompanyController],
    exports: [CompanyService],
    providers: [CompanyService],
})
export class CompanyModule {}
