import { Injectable } from '@nestjs/common';

import { CompanyRepository } from '../company/company.repository';
import { LeadDto } from './dto/LeadDto';
import { LeadEntity } from './lead.entity';
import { LeadRepository } from './lead.repository';
@Injectable()
export class LeadService {
    constructor(
        public readonly leadRepository: LeadRepository,
        public readonly companyRepository: CompanyRepository,
    ) {}

    async create(user, createDto): Promise<LeadEntity> {
        return this.leadRepository.create(user, createDto);
    }

    // async findById(id: string) {
    //     const leadInfo = await this.leadRepository.findOne({
    //         where: { id },
    //     });
    //     const nameCompany = await this.companyRepository.findOne({
    //         where: { id: leadInfo.idCompany },
    //     });
    //     console.table(nameCompany.name);
    // }
    async findLeadById(id: string): Promise<LeadDto> {
        return this.leadRepository.getLeadById(id);
    }
}
