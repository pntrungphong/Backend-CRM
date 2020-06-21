import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';

import { ContactEntity } from './contact.entity';

@EntityRepository(ContactEntity)
export class ContactRepository extends Repository<ContactEntity> {}
