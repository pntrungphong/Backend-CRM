import { Injectable } from '@nestjs/common';

import { UserEntity } from '../../modules/user/user.entity';
import { CompanyEntity } from './company.entity';
import { CompanyRepository } from './company.repository';
import { CreateCompanyDto } from './dto/CreateCompanyDto';
import { PageMetaDto } from '../../common/dto/PageMetaDto';
import { CompaniesPageOptionsDto } from './dto/CompaniesPageOptionsDto';
import { CompaniesPageDto } from './dto/CompaniesPageDto';
@Injectable()
export class CompanyService {
    constructor(public readonly companyRepository: CompanyRepository) {}
    async createCompany(
        user: UserEntity,
        data: CreateCompanyDto,
    ): Promise<CompanyEntity> {
        const companyObj = Object.assign(data, {
            created_by: user.id,
            updated_by: user.id,
        });
        const company = this.companyRepository.create({ ...companyObj });
        return this.companyRepository.save(company);
    }
    
    async getComapanies(
        pageOptionsDto: CompaniesPageOptionsDto,
    ): Promise<CompaniesPageDto> {
        const queryBuilder = this.companyRepository.createQueryBuilder(
            'company',
        );
        const [companies, companiesCount] = await queryBuilder
            .skip(pageOptionsDto.skip)
            .take(pageOptionsDto.take)
            .getManyAndCount();

        const pageMetaDto = new PageMetaDto({
            pageOptionsDto,
            itemCount: companiesCount,
        });
        return new CompaniesPageDto(companies.toDtos(), pageMetaDto);

    }
}
