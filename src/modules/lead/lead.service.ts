import { Injectable } from '@nestjs/common';

import { UserEntity } from '../../modules/user/user.entity';
import { CompanyRepository } from '../company/company.repository';
import { LeadUpdateDto } from './dto/LeadUpdateDto';
import { LeadEntity } from './lead.entity';
import { LeadRepository } from './lead.repository';
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
        const leadObj = Object.assign(createDto, {
            createdBy: user.id,
            updatedBy: user.id,
        });
        const lead = this.leadRepository.create({ ...leadObj });
        return this.leadRepository.save(lead);
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
}
