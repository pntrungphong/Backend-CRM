'use strict';
import { ApiPropertyOptional } from '@nestjs/swagger';

import { ContactEntity } from '../../contact.entity';
import { ContactReferralEntity } from '../referral.entity';

export class ReferralDto {
    @ApiPropertyOptional()
    idTarget: string;

    @ApiPropertyOptional({ type: [] })
    hastag: string;

    @ApiPropertyOptional()
    name: string;

    @ApiPropertyOptional()
    id: string;

    constructor(contact: ContactEntity, referral: ContactReferralEntity) {
        this.name = contact.name;
        this.id = referral.id.toString();
        this.hastag = referral.hastag;
        this.idTarget = referral.idTarget;
    }
}
