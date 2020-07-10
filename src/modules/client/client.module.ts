import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '../auth/auth.module';
import { CompanyController } from './controller/company.controller';
import { ContactController } from './controller/contact.controller';
import { CompanyRepository } from './repository/company.repository';
import { CompanyContactRepository } from './repository/companyContact.repository';
import { ContactRepository } from './repository/contact.repository';
import { ContactReferralRepository } from './repository/referral.repository';
import { CompanyService } from './service/company.service';
import { CompanyContactService } from './service/companyContact.service';
import { ContactService } from './service/contact.service';
import { ContactReferralService } from './service/referral.service';
import { TagRepository } from '../tag/tag.repository';

@Module({
    imports: [
        forwardRef(() => AuthModule),
        TypeOrmModule.forFeature([
            ContactRepository,
            CompanyRepository,
            CompanyContactRepository,
            ContactReferralRepository,
            TagRepository
        ]),
    ],
    controllers: [ContactController, CompanyController],
    exports: [
        CompanyService,
        ContactService,
        ContactReferralService,
        CompanyContactService,
    ],
    providers: [
        CompanyService,
        ContactService,
        ContactReferralService,
        CompanyContactService,
    ],
})
export class ClientModule {}
