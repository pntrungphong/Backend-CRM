import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '../auth/auth.module';
import { CompanyWebsiteRepository } from '../website/company.website.repository';
import { ContactWebsiteRepository } from '../website/contact.website.repository';
import { WebsiteService } from '../website/website.service';
import { ContactController } from './contact.controller';
import { ContactRepository } from './contact.repository';
import { ContactService } from './contact.service';

@Module({
    imports: [
        forwardRef(() => AuthModule),
        TypeOrmModule.forFeature([
            ContactRepository,
            ContactWebsiteRepository,
            CompanyWebsiteRepository,
        ]),
    ],
    controllers: [ContactController],
    exports: [ContactService],
    providers: [ContactService, WebsiteService],
})
export class ContactModule {}
