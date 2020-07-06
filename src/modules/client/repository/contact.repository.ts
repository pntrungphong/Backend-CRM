import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';

import { ContactEntity } from '../entity/contact.entity';

@EntityRepository(ContactEntity)
export class ContactRepository extends Repository<ContactEntity> {}
