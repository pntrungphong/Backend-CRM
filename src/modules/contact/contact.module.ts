import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '../auth/auth.module';
import { ContactController } from './contact.controller';
import { ContactRepository } from './contact.repository';
import { ContactService } from './contact.service';
import { ContactReferralService } from './contactreferral.service';
import { ContactReferralRepository } from './contactreferral.repository';

@Module({
    imports: [
        forwardRef(() => AuthModule),
        TypeOrmModule.forFeature([ContactRepository, ContactReferralRepository]),
    ],
    controllers: [ContactController],
    exports: [ContactService],
    providers: [ContactService, ContactReferralService],
})
export class ContactModule {}
