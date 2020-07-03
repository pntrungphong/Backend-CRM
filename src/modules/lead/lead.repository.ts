import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';

import { LeadEntity } from './lead.entity';
@EntityRepository(LeadEntity)
export class LeadRepository extends Repository<LeadEntity> {}
