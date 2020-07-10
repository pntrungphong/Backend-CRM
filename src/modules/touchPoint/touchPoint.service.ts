import { Injectable } from '@nestjs/common';

import { TouchPointRepository } from './touchPoint.repository';
import { TouchPointEntity } from './touchPoint.entity';
@Injectable()
export class TouchPointService {
    constructor(public readonly touchPointRepository:TouchPointRepository
    ) {}

    async create(user, createDto): Promise<TouchPointEntity> {
        return this.touchPointRepository.create(user, createDto);
    }
}
    