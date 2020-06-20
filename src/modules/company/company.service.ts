import { Injectable } from '@nestjs/common';

import { PageMetaDto } from '../../common/dto/PageMetaDto';
import { CompanyRepository } from './company.repository';
// import { CompanyRegisterDto } from '../auth/dto/CompanyRegisterDto';
import { CompaniesPageDto } from './dto/CompaniesPageDto';
import { CompaniesPageOptionsDto } from './dto/CompaniesPageOptionsDto';

@Injectable()
export class CompanyService {
    constructor(public readonly companyRepository: CompanyRepository) {}

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
