import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';

import { ContactReferralEntity } from './referral.entity';
@EntityRepository(ContactReferralEntity)
export class ContactReferralRepository extends Repository<
    ContactReferralEntity
> {}
