import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';

import { ContactReferralEntity } from './contactreferral.entity';
@EntityRepository(ContactReferralEntity)
export class ContactReferralRepository extends Repository<
    ContactReferralEntity
> {}
