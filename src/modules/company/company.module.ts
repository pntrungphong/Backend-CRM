import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '../auth/auth.module';
import { WebsiteModule } from '../website/website.module';
import { CompanyController } from './company.controller';
import { CompanyRepository } from './company.repository';
import { CompanyService } from './company.service';

@Module({
    imports: [
        WebsiteModule,
        forwardRef(() => AuthModule),
        TypeOrmModule.forFeature([CompanyRepository]),
    ],
    controllers: [CompanyController],
    exports: [CompanyService],
    providers: [CompanyService],
})
export class CompanyModule {}
