// import { forwardRef, Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';

// import { AuthModule } from '../auth/auth.module';
// import { CompanyController } from './company.controller';
// import { CompanyRepository } from './company.repository';
// import { CompanyService } from './company.service';

// @Module({
//     imports: [
//         forwardRef(() => AuthModule),
//         TypeOrmModule.forFeature([CompanyRepository]),
//     ],
//     controllers: [CompanyController],
//     exports: [CompanyService],
//     providers: [CompanyService],
// })
// export class CompanyModule {}

import { Module } from '@nestjs/common';

import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';

@Module({
    controllers: [CompanyController],
    providers: [CompanyService],
})
export class CompanyModule {}
