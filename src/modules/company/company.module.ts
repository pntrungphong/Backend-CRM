import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CompanyController } from './company.controller';
import { CompanyRepository } from './company.repository';
import { CompanyService } from './company.service';
import { UpdateCompanyService } from './updateCompany.service';

@Module({
    imports: [TypeOrmModule.forFeature([CompanyRepository])],
    controllers: [CompanyController],
    exports: [CompanyService, UpdateCompanyService],
    providers: [CompanyService, UpdateCompanyService],
})
export class CompanyModule {}
