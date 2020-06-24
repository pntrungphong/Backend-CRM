import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';

import { CompanyWebsiteEntity } from './company.website.entity';

@EntityRepository(CompanyWebsiteEntity)
export class CompanyWebsiteRepository extends Repository<
    CompanyWebsiteEntity
> {}
