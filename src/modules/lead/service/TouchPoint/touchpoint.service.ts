import { Injectable } from '@nestjs/common';

import { TouchPointDto } from '../../../../modules/lead/dto/touchpoint/TouchPointDto';
import { TouchPointsPageDto } from '../../../lead/dto/touchpoint/TouchPointsPageDto';
import { TouchPointsPagesOptionsDto } from '../../../lead/dto/touchpoint/TouchPointsPagesOptionsDto';
import { UserEntity } from '../../../user/user.entity';
import { UpdateTouchPointDto } from '../../dto/touchpoint/UpdateTouchPointDto';
import { TouchPointEntity } from '../../entity/Touchpoint/touchpoint.entity';
import { TouchPointRepository } from '../../repository/Touchpoint/touchpoint.repository';
import { TouchPointFileService } from '../TouchPoint_file/fileTouchPoint.service';
import { UpdateTouchPointMarkDoneDto } from '../../../../modules/lead/dto/touchpoint/UpdateTouchPointMarkDoneDto';
@Injectable()
export class TouchPointService {
    constructor(
        private readonly _touchPointRepository: TouchPointRepository,
        private readonly _touchPointFilePointService: TouchPointFileService,
    ) {}

    async create(
        user: UserEntity,
        createDto: UpdateTouchPointDto,
    ): Promise<TouchPointEntity> {
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
        return createTouchPoint;
    }

    async getList(
        pageOptionsDto: TouchPointsPagesOptionsDto,
    ): Promise<TouchPointsPageDto> {
        return this._touchPointRepository.getList(pageOptionsDto);
    }

    async findLeadById(id: string): Promise<TouchPointDto> {
        return this._touchPointRepository.getLeadById(id);
    }
    async update(
        id: string,
        updateDto: UpdateTouchPointDto,
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
                updateDto.leadId,
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
