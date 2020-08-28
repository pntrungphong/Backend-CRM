import { UserEntity } from 'modules/user/user.entity';
import { LogEntity } from '../entity/log.entity';
import { Injectable } from '@nestjs/common';
import { LogRepository } from '../repository/log.repository';
@Injectable()
export class LogService {
    constructor(private readonly _logRepository: LogRepository) {}
    async create(
        user: UserEntity,
        type: string,
        entityType: string,
        entityId: number,
        beforeUpdate: any,
        afterUpdate: any,
        fieldChange: any,
    ): Promise<LogEntity> {
        const createLog = await this._logRepository.create(
            user,
            type,
            entityType,
            entityId,
            beforeUpdate,
            afterUpdate,
            fieldChange,
        );
        return createLog;
    }
}
