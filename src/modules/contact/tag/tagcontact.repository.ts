import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';

import { TagContactEntity } from './tagcontact.entity';
@EntityRepository(TagContactEntity)
export class TagContactRepository extends Repository<TagContactEntity> {}
