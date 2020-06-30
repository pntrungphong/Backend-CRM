import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { PageMetaDto } from '../../common/dto/PageMetaDto';
import { UserEntity } from '../../modules/user/user.entity';
import { CompanyEntity } from './company.entity';
import { CompanyRepository } from './company.repository';
import { CompaniesPageDto } from './dto/CompaniesPageDto';
import { CompaniesPageOptionsDto } from './dto/CompaniesPageOptionsDto';
import { UpdateCompanyDto } from './dto/UpdateCompanyDto';
import { ContactRepository } from '../contact/contact.repository';
import { DetailCompanyDto } from './dto/DetailCompanyDto';
import { GeneralInfoDto } from '../contact/dto/GeneralInfoDto';
@Injectable()
export class CompanyService {
    constructor(
        public readonly companyRepository: CompanyRepository,
        private readonly _contactRepository: ContactRepository

    ) { }

    async create(
        user: UserEntity,
        createDto: UpdateCompanyDto,
    ): Promise<CompanyEntity> {
        const companyObj = Object.assign(createDto, {
            createdBy: user.id,
            updatedBy: user.id,
        });
        const company = this.companyRepository.create({ ...companyObj });

        return this.companyRepository.save(company);
    }

    async getList(
        pageOptionsDto: CompaniesPageOptionsDto,
    ): Promise<CompaniesPageDto> {
        const queryBuilder = this.companyRepository.createQueryBuilder(
            'company',
        );

        // handle query
        queryBuilder.where('1 = 1');
        queryBuilder.andWhere('LOWER (company.name) LIKE :name', {
            name: `%${pageOptionsDto.q.toLowerCase()}%`,
        });
        queryBuilder.orderBy('company.updated_at', pageOptionsDto.order);

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

    async findById(id: string): Promise<DetailCompanyDto> {
        const company = await this.companyRepository.findOne({
            where: { id },
            relations: ['cpt', 'tag'],
        });

        let listIdContact = company.cpt.map(it => it.contactId);
        let rawDatas = await this._contactRepository.findByIds([...listIdContact]);
        let result = new DetailCompanyDto(company);
        result.contact = rawDatas.map(it => new GeneralInfoDto(it));

        if (!company) {
            throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        }
        return result;
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
            updated_by: user.id,
        });

        return this.companyRepository.save(updatedCompany);
    }
}
