import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '../auth/auth.module';
import { CompanyWebsiteRepository } from '../website/company.website.repository';
import { ContactWebsiteRepository } from '../website/contact.website.repository';
import { WebsiteService } from '../website/website.service';

@Module({
    imports: [
        forwardRef(() => AuthModule),
        TypeOrmModule.forFeature([
            ContactWebsiteRepository,
            CompanyWebsiteRepository,
        ]),
    ],
    controllers: [],
    exports: [WebsiteService],
    providers: [WebsiteService],
})
export class WebsiteModule {}
