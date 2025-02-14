import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';

import { PageMetaDto } from '../../../common/dto/PageMetaDto';
import { UserEntity } from '../../user/user.entity';
import { CompaniesPageDetailDto } from '../dto/company/CompaniesPageDetailDto';
import { CompaniesPageOptionsDto } from '../dto/company/CompaniesPageOptionsDto';
import { DetailCompanyDto } from '../dto/company/DetailCompanyDto';
import { UpdateCompanyDto } from '../dto/company/UpdateCompanyDto';
import { GeneralInfoDto } from '../dto/contact/GeneralInfoDto';
import { CompanyEntity } from '../entity/company.entity';
import { CompanyRepository } from '../repository/company.repository';
import { ContactRepository } from '../repository/contact.repository';
import { BasicInfoLeadDto } from '../../lead/dto/lead/BasicInfoLeadDto';
import { LogRepository } from '../../log/repository/log.repository';
import { detailedDiff } from 'deep-object-diff';
import { Transactional } from 'typeorm-transactional-cls-hooked';
@Injectable()
export class CompanyService {
    public logger = new Logger(CompanyService.name);
    constructor(
        public readonly companyRepository: CompanyRepository,
        private readonly _contactRepository: ContactRepository,
        private _logRepository: LogRepository,
    ) {}

    @Transactional()
    async create(
        user: UserEntity,
        createDto: UpdateCompanyDto,
    ): Promise<CompanyEntity> {
        const companyObj = Object.assign(createDto, {
            createdBy: user.id,
            updatedBy: user.id,
        });

        const company = this.companyRepository.create({ ...companyObj });
        await this._logRepository.create(
            user,
            'create',
            'company',
            parseInt(company.id, 10),
            createDto,
            createDto,
            createDto,
        );
        return this.companyRepository.save(company);
    }

    async getList(
        pageOptionsDto: CompaniesPageOptionsDto,
    ): Promise<CompaniesPageDetailDto> {
        const queryBuilder = this.companyRepository
            .createQueryBuilder('company')
            .leftJoinAndSelect('company.contact', 'contact')
            .where('company.name ILIKE :name', {
                name: `%${pageOptionsDto.q}%`,
            })
            .addOrderBy('company.updatedAt', pageOptionsDto.order);
        const [companies, companiesCount] = await queryBuilder
            .skip(pageOptionsDto.skip)
            .take(pageOptionsDto.take)
            .getManyAndCount();

        const listIdCompany = companies.map((it) => it.id);
        const results = [];
        for await (const iterator of listIdCompany) {
            const company = await this.companyRepository.findOne({
                where: { id: iterator },
                relations: ['contact'],
            });
            const listIdContact = company.contact.map((it) => it.idContact);
            const rawData = await this._contactRepository.findByIds([
                ...listIdContact,
            ]);
            const result = new DetailCompanyDto(company);
            result.contact = rawData.map((it) => new GeneralInfoDto(it));
            results.push(result);
        }
        const pageMetaDto = new PageMetaDto({
            pageOptionsDto,
            itemCount: companiesCount,
        });
        return new CompaniesPageDetailDto(results, pageMetaDto);
    }

    async findById(id: string): Promise<DetailCompanyDto> {
        const company = await this.companyRepository.findOne({
            where: { id },
            relations: ['contact', 'tag', 'lead'],
        });

        if (!company) {
            throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        }

        const listIdContact = company.contact.map((it) => it.idContact);
        const rawData = await this._contactRepository.findByIds(listIdContact);
        const result = new DetailCompanyDto(company);
        result.contact = rawData.map((it) => new GeneralInfoDto(it));

        result.lead = company.lead.map((it) => new BasicInfoLeadDto(it));

        return result;
    }
    @Transactional()
    async update(
        id: string,
        updateDto: UpdateCompanyDto,
        user: UserEntity,
    ): Promise<CompanyEntity> {
        const company = await this.companyRepository.findOne({
            where: { id },
        });
        const oldCompany = Object.assign({}, company);
        if (!company) {
            throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        }
        const updatedCompany = Object.assign(company, {
            ...updateDto,
            updated_by: user.id,
        });
        const diffs = detailedDiff(oldCompany, updatedCompany);
        await this._logRepository.create(
            user,
            'update',
            'company',
            parseInt(updatedCompany.id, 10),
            oldCompany,
            updatedCompany,
            diffs,
        );

        return this.companyRepository.save(updatedCompany);
    }
}
