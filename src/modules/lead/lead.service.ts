import { Injectable } from '@nestjs/common';

import { UserEntity } from '../../modules/user/user.entity';
import { LeadsPageDetailDto } from './dto/LeadsPageDetailDto';
import { LeadsPageOptionsDto } from './dto/LeadsPageOptionsDto';
import { LeadUpdateDto } from './dto/LeadUpdateDto';
import { LeadEntity } from './lead.entity';
import { LeadRepository } from './lead.repository';
import { CompanyRepository } from '../client/repository/company.repository';
import { LeadDto } from './dto/LeadDto';
import { DetailLeadDto } from './dto/DetailLeadDto';
@Injectable()
export class LeadService {
    constructor(
        public readonly leadRepository: LeadRepository,
        public readonly companyRepository: CompanyRepository,
    ) {}

    async create(user, createDto): Promise<LeadEntity> {
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
