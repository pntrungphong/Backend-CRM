import { Injectable } from '@nestjs/common';

import { UserEntity } from '../../../user/user.entity';
import { UpdateTouchPointDto } from '../../dto/touchpoint/UpdateTouchPointDto';
import { TouchPointEntity } from '../../entity/Touchpoint/touchpoint.entity';
import { TouchPointRepository } from '../../repository/Touchpoint/touchpoint.repository';
@Injectable()
export class TouchPointService {
    constructor(public readonly touchPointRepository: TouchPointRepository) {}

    async create(
        user: UserEntity,
        createDto: UpdateTouchPointDto,
    ): Promise<TouchPointEntity> {
        return this.touchPointRepository.create(user, createDto);
    }
}
