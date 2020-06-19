import { Injectable } from '@nestjs/common';

import { UserEntity } from '../../modules/user/user.entity';
import { CompanyEntity } from './company.entity';
import { CompanyRepository } from './company.repository';
import { CreateCompanyDto } from './dto/CreateCompanyDto';
@Injectable()
export class CompanyService {
    constructor(public readonly companyRepository: CompanyRepository) {}
    async createCompany(
        user: UserEntity,
        data: CreateCompanyDto,
    ): Promise<CompanyEntity> {
        const companyObj = Object.assign(data, {
            created_by: user.id,
            updated_by: '',
        });
        const company = this.companyRepository.create({ ...companyObj });
        return this.companyRepository.save(company);
    }
}
