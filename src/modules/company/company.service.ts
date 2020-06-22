import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { PageMetaDto } from '../../common/dto/PageMetaDto';
import { UserEntity } from '../../modules/user/user.entity';
import { CompanyEntity } from './company.entity';
import { CompanyRepository } from './company.repository';
import { CompaniesPageDto } from './dto/CompaniesPageDto';
import { CompaniesPageOptionsDto } from './dto/CompaniesPageOptionsDto';
import { CompanyDto } from './dto/CompanyDto';
import { CreateCompanyDto } from './dto/CreateCompanyDto';
import { UpdateCompanyDto } from './dto/UpdateCompanyDto';
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

    async readCompany(id: string): Promise<CompanyDto> {
        const company = await this.companyRepository.findOne({
            where: { id },
        });
        if (!company) {
            throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        }
        return new CompanyDto(company.toDto());
    }

    async findByName(
        name: string,
        pageOptionsDto: CompaniesPageOptionsDto,
    ): Promise<CompaniesPageDto> {
        const queryBuilder = this.companyRepository
            .createQueryBuilder('company')
            .where('(company.name = :name)')
            .setParameters({ name });

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
