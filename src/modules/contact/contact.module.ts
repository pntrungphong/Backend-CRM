import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '../auth/auth.module';
import { CompanyContactModule } from '../company-contact/companyContact.module';
import { ContactController } from './contact.controller';
import { ContactRepository } from './contact.repository';
import { ContactService } from './contact.service';
import { ContactReferralRepository } from './referral/contactreferral.repository';
import { ContactReferralService } from './referral/contactreferral.service';
import { TagContactRepository } from './tag/tagcontact.repository';
import { TagContactService } from './tag/tagcontact.service';

@Module({
    imports: [
        CompanyContactModule,
        forwardRef(() => AuthModule),
        TypeOrmModule.forFeature([
            ContactRepository,
            ContactReferralRepository,
            TagContactRepository,
        ]),
    ],
    controllers: [ContactController],
    exports: [ContactService],
    providers: [ContactService, ContactReferralService, TagContactService],
})
export class ContactModule { }
