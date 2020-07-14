import { Injectable } from '@nestjs/common';

import { CompanyRepository } from '../../../client/repository/company.repository';
import { UserEntity } from '../../../user/user.entity';
import { DetailLeadDto } from '../../dto/lead/DetailLeadDto';
import { LeadsPageDetailDto } from '../../dto/lead/LeadsPageDetailDto';
import { LeadsPageOptionsDto } from '../../dto/lead/LeadsPageOptionsDto';
import { LeadUpdateDto } from '../../dto/lead/LeadUpdateDto';
import { LeadEntity } from '../../entity/Lead/lead.entity';
import { LeadRepository } from '../../repository/Lead/lead.repository';
@Injectable()
export class LeadService {
    constructor(
        public readonly leadRepository: LeadRepository,
        public readonly companyRepository: CompanyRepository,
    ) {}

    async create(
        user: UserEntity,
        createDto: LeadUpdateDto,
    ): Promise<LeadEntity> {
        return this.leadRepository.create(user, createDto);
    }
    async update(
        id: string,
        updateDto: LeadUpdateDto,
        user: UserEntity,
    ): Promise<LeadEntity> {
        return this.leadRepository.update(id, updateDto, user);
    }

    async findLeadById(id: string): Promise<DetailLeadDto> {
        return this.leadRepository.getLeadById(id);
    }

    async getList(
        pageOptionsDto: LeadsPageOptionsDto,
    ): Promise<LeadsPageDetailDto> {
        return this.leadRepository.getList(pageOptionsDto);
    }
}
