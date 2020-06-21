import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserEntity } from 'modules/user/user.entity';
import { UpdateResult } from 'typeorm';

import { CompanyEntity } from './company.entity';
import { CompanyRepository } from './company.repository';
import { UpdateCompanyDto } from './dto/UpdateCompanyDto';
@Injectable()
export class UpdateCompanyService {
    constructor(public readonly companyRepository: CompanyRepository) {}
    async updateCompany(
        id: string,
        data: UpdateCompanyDto,
        user: UserEntity,
    ): Promise<CompanyEntity> {
        const company = await this.companyRepository.findOne({
            where: { id },
        });
        if (!company) {
            throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        }
        const updatedCompany = Object.assign(company, {
            ...data,
            updated_by: user.id,
        });

        return this.companyRepository.save(updatedCompany);
    }
}
