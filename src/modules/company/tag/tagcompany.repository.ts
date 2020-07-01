import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';

import { TagCompanyEntity } from './tagcompany.entity';
@EntityRepository(TagCompanyEntity)
export class TagCompanyRepository extends Repository<TagCompanyEntity> {}
