import { Repository, AbstractRepository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';
import { TouchPointEntity } from './touchPoint.entity';
import { TouchPointUpdateDto } from './dto/TouchPointUpdateDto';
import { UserEntity } from '../user/user.entity';

@EntityRepository(TouchPointEntity)
export class TouchPointRepository extends AbstractRepository<TouchPointEntity> {
    public async create(
        user: UserEntity,
        createDto: TouchPointUpdateDto,
    ): Promise<TouchPointEntity> {
        const touchPointObj = Object.assign(createDto, {
            createdBy: user.id,
            updatedBy: user.id,
        });
        const touchPoint = this.repository.create({ ...touchPointObj });
        return this.repository.save(touchPoint);
    }
}
