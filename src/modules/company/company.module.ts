import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CompanyContactModule } from '../../modules/companyContact/companyContact.module';
import { CompanyContactRepository } from '../../modules/companyContact/companyContact.repository';
import { AuthModule } from '../auth/auth.module';
import { CompanyController } from './company.controller';
import { CompanyRepository } from './company.repository';
import { CompanyService } from './company.service';

@Module({
    imports: [
        CompanyContactModule,
        forwardRef(() => AuthModule),
        TypeOrmModule.forFeature([CompanyRepository, CompanyContactRepository]),
    ],
    controllers: [CompanyController],
    exports: [CompanyService],
    providers: [CompanyService],
})
export class CompanyModule {}
