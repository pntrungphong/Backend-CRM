import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { LeadChangeRankDto } from '../../../../modules/lead/dto/lead/LeadChangeRankDto';
import { NoteRepository } from '../../../lead/repository/Note/note.repository';
import { UserEntity } from '../../../user/user.entity';
import { DetailLeadDto } from '../../dto/lead/DetailLeadDto';
import { LeadsPageDetailDto } from '../../dto/lead/LeadsPageDetailDto';
import { LeadsPageOptionsDto } from '../../dto/lead/LeadsPageOptionsDto';
import { LeadUpdateDto } from '../../dto/lead/LeadUpdateDto';
import { LeadEntity } from '../../entity/Lead/lead.entity';
import { LeadRepository } from '../../repository/Lead/lead.repository';
import { LeadChangeStatusDto } from 'modules/lead/dto/lead/LeadChangeStatusDto';
@Injectable()
export class LeadService {
    constructor(
        private readonly _leadRepository: LeadRepository,
        private readonly _noteRepository: NoteRepository,
    ) {}

    async create(
        user: UserEntity,
        createDto: LeadUpdateDto,
    ): Promise<LeadEntity> {
        const createLead = await this._leadRepository.create(user, createDto);
        if (createDto.note) {
            await this._noteRepository.create(createDto.note, createLead.id);
        }
        return createLead;
    }
    async update(
        id: string,
        updateDto: LeadUpdateDto,
        user: UserEntity,
    ): Promise<LeadEntity> {
        const updatedLead = await this._leadRepository.update(
            id,
            updateDto,
            user,
        );
        if (updateDto.note) {
            await this._noteRepository.update(updateDto.note, updatedLead.id);
        }
        if (!updatedLead) {
            throw new HttpException(
                'Cập nhật thất bại',
                HttpStatus.NOT_ACCEPTABLE,
            );
        }
        return updatedLead;
    }

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
            throw new HttpException(
                'Cập nhật thất bại',
                HttpStatus.NOT_ACCEPTABLE,
            );
        }
        return changeRank;
    }
    async findLeadById(id: string): Promise<DetailLeadDto> {
        return this._leadRepository.getLeadById(id);
    }

    async getList(
        pageOptionsDto: LeadsPageOptionsDto,
    ): Promise<LeadsPageDetailDto> {
        return this._leadRepository.getList(pageOptionsDto);
    }

    async changeStatus(
        id: string,
        updateDto: LeadChangeStatusDto,
        user: UserEntity,
    ): Promise<LeadEntity> {
        const changeStatus = await this._leadRepository.changeStatus(
            id,
            updateDto,
            user,
        );
        if (!changeStatus) {
            throw new HttpException(
                'Update failed',
                HttpStatus.NOT_ACCEPTABLE,
            );
        }
        return changeStatus;
    }
}
