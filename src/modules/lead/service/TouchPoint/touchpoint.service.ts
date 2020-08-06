import { Injectable, Logger } from '@nestjs/common';
import { Transactional } from 'typeorm-transactional-cls-hooked/dist/Transactional';

import { TouchPointDto } from '../../../../modules/lead/dto/touchpoint/TouchPointDto';
import { UpdateDetailTouchPointDto } from '../../../../modules/lead/dto/touchpoint/UpdateDetailTouchPointDto';
import { UpdateTouchPointMarkDoneDto } from '../../../../modules/lead/dto/touchpoint/UpdateTouchPointMarkDoneDto';
import { TouchPointsPageDto } from '../../../lead/dto/touchpoint/TouchPointsPageDto';
import { TouchPointsPagesOptionsDto } from '../../../lead/dto/touchpoint/TouchPointsPagesOptionsDto';
import { UserEntity } from '../../../user/user.entity';
import { UpdateTouchPointDto } from '../../dto/touchpoint/UpdateTouchPointDto';
import { TouchPointEntity } from '../../entity/Touchpoint/touchpoint.entity';
import { TouchPointRepository } from '../../repository/Touchpoint/touchpoint.repository';
import { TaskService } from '../Task/task.service';
@Injectable()
export class TouchPointService {
    public logger = new Logger(TouchPointService.name);
    constructor(
        private readonly _touchPointRepository: TouchPointRepository,
        private readonly _touchPointTaskPointService: TaskService,
    ) {}

    @Transactional()
    async create(
        user: UserEntity,
        createDto: UpdateTouchPointDto,
    ): Promise<TouchPointEntity> {
        this.logger.log('POST');
        const createTouchPoint = await this._touchPointRepository.create(
            user,
            createDto,
        );
        if (createDto.task) {
            createDto.task.map((task) => {
                void this._touchPointTaskPointService.create(
                    user,
                    task,
                    createTouchPoint.id,
                );
            });
        }
        return createTouchPoint;
    }

    async getList(
        pageOptionsDto: TouchPointsPagesOptionsDto,
    ): Promise<TouchPointsPageDto> {
        this.logger.log('GET LIST');
        return this._touchPointRepository.getList(pageOptionsDto);
    }

    async getTouchPointById(id: string): Promise<TouchPointDto> {
        return this._touchPointRepository.getTouchPointById(id);
    }

    @Transactional()
    async update(
        id: string,
        updateDto: UpdateDetailTouchPointDto,
        user: UserEntity,
    ): Promise<TouchPointEntity> {
        const updateTouchPoint = await this._touchPointRepository.update(
            id,
            updateDto,
            user,
        );

        if (updateDto.task) {
            this.logger.log(updateDto.task);
        }
        this.logger.log('a');

        if (updateDto.task) {
            this.logger.log('b');
            void (await this._touchPointTaskPointService.remove(
                updateTouchPoint.id,
            ));
            updateDto.task.map((task) => {
                void this._touchPointTaskPointService.remove(
                    updateTouchPoint.id,
                );
                void this._touchPointTaskPointService.create(
                    user,
                    task,
                    updateTouchPoint.id,
                );
                this.logger.log(task);
                this.logger.log('aaa');
            });
        }

        return updateTouchPoint;
    }

    async updateMarkDone(
        id: string,
        updateDto: UpdateTouchPointMarkDoneDto,
        user: UserEntity,
    ): Promise<TouchPointEntity> {
        return this._touchPointRepository.updateMarkDone(id, updateDto, user);
    }
}
