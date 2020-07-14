import { AbstractRepository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';

import { UserEntity } from '../user/user.entity';
import { UpdateTouchPointDto } from './dto/UpdateTouchPointDto';
import { TouchPointEntity } from './touchpoint.entity';
@EntityRepository(TouchPointEntity)
export class TouchPointRepository extends AbstractRepository<TouchPointEntity> {
    public async create(
        user: UserEntity,
        touchPointDto: UpdateTouchPointDto,
    ): Promise<TouchPointEntity> {
        let touchPointEntity = this.repository.create();
        touchPointEntity = this.repository.merge(touchPointEntity, {
            createdBy: user.id,
            updatedBy: user.id,
            ...touchPointDto,
        });
        return this.repository.save(touchPointDto, { reload: true });
    }
}
