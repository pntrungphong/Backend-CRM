import { HttpException, HttpStatus, Logger } from '@nestjs/common';
import { AbstractRepository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';
import { LogEntity } from '../entity/log.entity';
import { UserEntity } from '../../../modules/user/user.entity';
import { LogDto } from '../dto/LogDto';
@EntityRepository(LogEntity)
export class LogRepository extends AbstractRepository<LogEntity> {
    public async create(
        user: UserEntity,
        type: string,
        entityType: string,
        entityId: number,
        beforeUpdate: any,
        afterUpdate: any,
        fieldChange: any,
    ): Promise<LogEntity> {
        let logEntity = this.repository.create();
        logEntity = Object.assign(logEntity, {
            type,
            entityType,
            entityId,
            beforeUpdate,
            afterUpdate,
            fieldChange,
            createdBy: user.firstName,
        });
        return this.repository.save(logEntity);
    }
}
