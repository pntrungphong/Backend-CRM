import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';

import { ContactWebsiteEntity } from './contact.website.entity';

@EntityRepository(ContactWebsiteEntity)
export class ContactWebsiteRepository extends Repository<
    ContactWebsiteEntity
> {}
