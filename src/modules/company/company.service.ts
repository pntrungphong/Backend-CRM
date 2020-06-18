import { Injectable } from '@nestjs/common';

import { CompanyEntity } from './company.entity';
import { CompanyRepository } from './company.repository';
import { CompanyDto } from './dto/CompanyDto';
@Injectable()
export class CompanyService {
    constructor(public readonly companyRepository: CompanyRepository) {}

    createCompany(data: CompanyDto): Promise<CompanyEntity> {
        const company = this.companyRepository.create({ ...data });
        return this.companyRepository.save(company);
    }
}
