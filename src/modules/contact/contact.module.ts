import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CompanyContactModule } from '../../modules/companyContact/companyContact.module';
import { AuthModule } from '../auth/auth.module';
import { ContactController } from './contact.controller';
import { ContactRepository } from './contact.repository';
import { ContactService } from './contact.service';

@Module({
    imports: [
        CompanyContactModule,
        forwardRef(() => AuthModule),
        TypeOrmModule.forFeature([ContactRepository]),
    ],
    controllers: [ContactController],
    exports: [ContactService],
    providers: [ContactService],
})
export class ContactModule {}
