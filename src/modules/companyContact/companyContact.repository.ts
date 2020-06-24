import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';

import { CompanyContactEntity } from './companyContact.entity';

@EntityRepository(CompanyContactEntity)
export class CompanyContactRepository extends Repository<
    CompanyContactEntity
> {}
