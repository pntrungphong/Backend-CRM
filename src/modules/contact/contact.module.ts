import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '../auth/auth.module';
import { CompanyContactModule } from '../company-contact/companyContact.module';
import { CompanyRepository } from '../company/company.repository';
import { ContactController } from './contact.controller';
import { ContactRepository } from './contact.repository';
import { ContactService } from './contact.service';
import { ContactReferralRepository } from './referral/referral.repository';
import { ContactReferralService } from './referral/referral.service';

@Module({
    imports: [
        CompanyContactModule,
        forwardRef(() => AuthModule),
        TypeOrmModule.forFeature([
            ContactRepository,
            ContactReferralRepository,
            CompanyRepository,
        ]),
    ],
    controllers: [ContactController],
    exports: [ContactService],
    providers: [ContactService, ContactReferralService],
})
export class ContactModule {}
