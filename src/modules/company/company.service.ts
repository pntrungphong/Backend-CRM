import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { PageMetaDto } from '../../common/dto/PageMetaDto';
import { UserEntity } from '../../modules/user/user.entity';
import { CompanyEntity } from './company.entity';
import { CompanyRepository } from './company.repository';
import { CompaniesPageDto } from './dto/CompaniesPageDto';
import { CompaniesPageOptionsDto } from './dto/CompaniesPageOptionsDto';
import { CompanyDto } from './dto/CompanyDto';
import { UpdateCompanyDto } from './dto/UpdateCompanyDto';
@Injectable()
export class CompanyService {
    constructor(public readonly companyRepository: CompanyRepository) {}
    async create(
        user: UserEntity,
        createDto: UpdateCompanyDto,
    ): Promise<CompanyEntity> {
        const companyObj = Object.assign(createDto, {
            email: createDto.email.join('|'),
            phone: createDto.phone.join('|'),
            address: createDto.address.join('|'),
            url: createDto.url.join('|'),
            createdBy: user.id,
            updatedBy: user.id,
        });
        const company = this.companyRepository.create({ ...companyObj });
        return this.companyRepository.save(company);
    }

    async getList(
        pageOptionsDto: CompaniesPageOptionsDto,
    ): Promise<CompaniesPageDto> {
        const queryBuilder = this.companyRepository
            .createQueryBuilder('company')
            .innerJoinAndSelect('company.cpt', 'cpt');
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

    async findById(id: string): Promise<CompanyDto> {
        const company = await this.companyRepository.findOne({
            where: { id },
        });
        if (!company) {
            throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        }
        return company.toDto() as CompanyDto;
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

    async update(
        id: string,
        updateDto: UpdateCompanyDto,
        user: UserEntity,
    ): Promise<CompanyEntity> {
        const company = await this.companyRepository.findOne({
            where: { id },
        });
        if (!company) {
            throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        }
        const updatedCompany = Object.assign(company, {
            ...updateDto,
            email: updateDto.email.join('|'),
            phone: updateDto.phone.join('|'),
            address: updateDto.address.join('|'),
            url: updateDto.url.join('|'),
            updated_by: user.id,
        });

        return this.companyRepository.save(updatedCompany);
    }
}
