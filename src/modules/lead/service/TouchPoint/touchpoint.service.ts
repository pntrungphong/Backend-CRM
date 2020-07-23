import { Injectable, Logger } from '@nestjs/common';

import { TouchPointDto } from '../../../../modules/lead/dto/touchpoint/TouchPointDto';
import { UpdateTouchPointMarkDoneDto } from '../../../../modules/lead/dto/touchpoint/UpdateTouchPointMarkDoneDto';
import { TouchPointsPageDto } from '../../../lead/dto/touchpoint/TouchPointsPageDto';
import { TouchPointsPagesOptionsDto } from '../../../lead/dto/touchpoint/TouchPointsPagesOptionsDto';
import { UserEntity } from '../../../user/user.entity';
import { UpdateTouchPointDto } from '../../dto/touchpoint/UpdateTouchPointDto';
import { TouchPointEntity } from '../../entity/Touchpoint/touchpoint.entity';
import { TouchPointRepository } from '../../repository/Touchpoint/touchpoint.repository';
import { TouchPointFileService } from '../TouchPoint_file/fileTouchPoint.service';
import { Transactional } from 'typeorm-transactional-cls-hooked/dist/Transactional';
import { UpdateDetailTouchPointDto } from '../../../../modules/lead/dto/touchpoint/UpdateDetailTouchPointDto';
@Injectable()
export class TouchPointService {
    constructor(
        private readonly _touchPointRepository: TouchPointRepository,
        private readonly _touchPointFilePointService: TouchPointFileService,
    ) {}
    @Transactional()
    async create(
        user: UserEntity,
        createDto: UpdateTouchPointDto,
    ): Promise<TouchPointEntity> {
        Logger.log('tp.service up');
        const createTouchPoint = await this._touchPointRepository.create(
            user,
            createDto,
        );
        const idTouchPoint = parseInt(createTouchPoint.id, 10);
        if (createDto.file) {
            await this._touchPointFilePointService.createFileTouchPoint(
                createDto.file,
                idTouchPoint,
                createDto.leadId,
            );
        }
        Logger.log('tp.service down');
        return createTouchPoint;
    }

    async getList(
        pageOptionsDto: TouchPointsPagesOptionsDto,
    ): Promise<TouchPointsPageDto> {
        Logger.log('tp.service');
        return this._touchPointRepository.getList(pageOptionsDto);
    }

    async getTouchPointById(id: string): Promise<TouchPointDto> {
        return this._touchPointRepository.getTouchPointById(id);
    }
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
        const idTouchPoint = parseInt(id, 10);
        if (updateDto.file) {
            await this._touchPointFilePointService.updateFileTouchPoint(
                updateDto.file,
                idTouchPoint,
                updateTouchPoint.leadId,
            );
        }
        return updateTouchPoint;
    }
    async updateMarkDone(
        id: string,
        updateDto: UpdateTouchPointMarkDoneDto,
        user: UserEntity,
    ): Promise<TouchPointEntity> {
        const updateTouchPoint = await this._touchPointRepository.updateMarkDone(
            id,
            updateDto,
            user,
        );
        return updateTouchPoint;
    }
}
