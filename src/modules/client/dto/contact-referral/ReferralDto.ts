'use strict';
import { ApiPropertyOptional } from '@nestjs/swagger';

import { ContactEntity } from '../../entity/contact.entity';
import { ContactReferralEntity } from '../../entity/referral.entity';

export class ReferralDto {
    @ApiPropertyOptional()
    idTarget: string;

    @ApiPropertyOptional({ type: [] })
    hashtag: string;

    @ApiPropertyOptional()
    name: string;

    @ApiPropertyOptional()
    id: string;

    constructor(contact: ContactEntity, referral: ContactReferralEntity) {
        this.name = contact.name;
        this.id = referral.id.toString();
        this.hashtag = referral.hashtag;
        this.idTarget = referral.idTarget;
    }
}
