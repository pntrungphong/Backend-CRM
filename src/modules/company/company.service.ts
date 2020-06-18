import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdateResult } from 'typeorm';

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
    async updateCompany(id: string, data: CompanyDto): Promise<UpdateResult> {
        const company = await this.companyRepository.findOne({
            where: { id },
        });
        if (!company) {
            throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        }
        return this.companyRepository.update(id, data);
    }
}
