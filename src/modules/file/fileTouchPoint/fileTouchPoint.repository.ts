import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';

import { TouchPointFileEntity } from './fileTouchPoint.entity';

@EntityRepository(TouchPointFileEntity)
export class TouchPointFileRepository extends Repository<
    TouchPointFileEntity
> {}
