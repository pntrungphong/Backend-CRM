import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { Transactional } from 'typeorm-transactional-cls-hooked/dist/Transactional';

import { StatusTouchPoint } from '../../../../common/constants/status-touchpoint';
import { Lead4LaneDto } from '../../../../modules/lead/dto/lead/Lead4LaneDto';
import { LeadChangeRankDto } from '../../../../modules/lead/dto/lead/LeadChangeRankDto';
import { LeadChangeStatusDto } from '../../../../modules/lead/dto/lead/LeadChangeStatusDto';
import { LeadUpdateByIdDto } from '../../../../modules/lead/dto/lead/LeadUpdateByIdDto';
import { TouchPointRepository } from '../../../../modules/lead/repository/Touchpoint/touchpoint.repository';
import { InfoOnHovDto } from '../../../lead/dto/lead/InfoOnHovDto';
import { NoteRepository } from '../../../lead/repository/Note/note.repository';
import { UserEntity } from '../../../user/user.entity';
import { DetailLeadDto } from '../../dto/lead/DetailLeadDto';
import { LeadsPageDetailDto } from '../../dto/lead/LeadsPageDetailDto';
import { LeadsPageOptionsDto } from '../../dto/lead/LeadsPageOptionsDto';
import { LeadUpdateDto } from '../../dto/lead/LeadUpdateDto';
import { LeadEntity } from '../../entity/Lead/lead.entity';
import { LeadRepository } from '../../repository/Lead/lead.repository';
@Injectable()
export class LeadService {
    public logger = new Logger(LeadService.name);
    constructor(
        private readonly _leadRepository: LeadRepository,
        private readonly _noteRepository: NoteRepository,
        private readonly _touchPointRepository: TouchPointRepository,
    ) {}
    @Transactional()
    async create(
        user: UserEntity,
        createDto: LeadUpdateDto,
    ): Promise<LeadEntity> {
        if (!createDto.onHov) {
            createDto.onHov = 0;
        }
        const createLead = await this._leadRepository.create(user, createDto);
        if (createDto.note) {
            await this._noteRepository.create(createDto.note, createLead.id);
        }

        let orderTouchPoint = 1;
        let status = StatusTouchPoint.UNDONE;
        if (!createDto.lane) {
            createDto.lane = 'LM';
            orderTouchPoint = 0;
            status = StatusTouchPoint.DONE;
        }

        void (await this._touchPointRepository.createTouchPointWithLane(
            user,
            createDto.lane,
            parseInt(createLead.id, 10),
            orderTouchPoint,
            status,
        ));

        return createLead;
    }
    @Transactional()
    async update(
        id: string,
        updateDto: LeadUpdateByIdDto,
        user: UserEntity,
    ): Promise<LeadEntity> {
        Logger.log('lead.service');
        const updatedLead = await this._leadRepository.update(
            id,
            updateDto,
            user,
        );
        if (updateDto.note) {
            await this._noteRepository.update(updateDto.note, updatedLead.id);
        }
        if (!updatedLead) {
            throw new HttpException('Update failed', HttpStatus.NOT_ACCEPTABLE);
        }
        return updatedLead;
    }
    @Transactional()
    async changeRank(
        id: string,
        updateDto: LeadChangeRankDto,
        user: UserEntity,
    ): Promise<LeadEntity> {
        const changeRank = await this._leadRepository.changeRank(
            id,
            updateDto,
            user,
        );
        if (!changeRank) {
            throw new HttpException('Update failed', HttpStatus.NOT_ACCEPTABLE);
        }
        return changeRank;
    }
    async findLeadById(id: string): Promise<DetailLeadDto> {
        return this._leadRepository.getLeadById(id);
    }

    async getLead4Lane(): Promise<Lead4LaneDto> {
        return this._leadRepository.getList4Lane();
    }

    async getList(
        pageOptionsDto: LeadsPageOptionsDto,
    ): Promise<LeadsPageDetailDto> {
        this.logger.log('GET LIST');
        return this._leadRepository.getList(pageOptionsDto);
    }
    @Transactional()
    async changeStatus(
        id: string,
        updateDto: LeadChangeStatusDto,
        user: UserEntity,
    ): Promise<LeadEntity> {
        this.logger.log('Chang Status');
        const changeStatus = await this._leadRepository.changeStatus(
            id,
            updateDto,
            user,
        );
        if (!changeStatus) {
            throw new HttpException('Update failed', HttpStatus.NOT_ACCEPTABLE);
        }
        return changeStatus;
    }
    @Transactional()
    async onHov(
        id: string,
        onHovDto: InfoOnHovDto,
        user: UserEntity,
    ): Promise<LeadEntity> {
        const onHov = await this._leadRepository.onHov(id, onHovDto, user);
        if (!onHov) {
            throw new HttpException('Update failed', HttpStatus.NOT_ACCEPTABLE);
        }
        return onHov;
    }
}
