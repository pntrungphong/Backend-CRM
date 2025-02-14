import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FindConditions } from 'typeorm';

import { PageMetaDto } from '../../../common/dto/PageMetaDto';
import { UserEntity } from '../../user/user.entity';
import { GeneralInfoDto as CompanyData } from '../dto/company/GeneralInfoDto';
import { ReferralDto } from '../dto/contact-referral/ReferralDto';
import { ContactPageDetailDto } from '../dto/contact/ContactsPageDetailDto';
import { ContactsPageOptionsDto } from '../dto/contact/ContactsPageOptionsDto';
import { ContactUpdateDto } from '../dto/contact/ContactUpdateDto';
import { DetailContactDto } from '../dto/contact/DetailContactDto';
import { ContactEntity } from '../entity/contact.entity';
import { CompanyRepository } from '../repository/company.repository';
import { ContactRepository } from '../repository/contact.repository';
import { BasicInfoLeadDto } from '../../lead/dto/lead/BasicInfoLeadDto';
import { LogRepository } from '../../log/repository/log.repository';
import { detailedDiff } from 'deep-object-diff';
import { Transactional } from 'typeorm-transactional-cls-hooked';

@Injectable()
export class ContactService {
    constructor(
        public readonly contactRepository: ContactRepository,
        private _companyRepository: CompanyRepository,
        private _logRepository: LogRepository,
    ) {}

    findOne(findData: FindConditions<ContactEntity>): Promise<ContactEntity> {
        return this.contactRepository.findOne(findData);
    }
    @Transactional()
    async create(
        createDto: ContactUpdateDto,
        user: UserEntity,
    ): Promise<ContactEntity> {
        const contactObj = Object.assign(createDto, {
            createdBy: user.id,
            updatedBy: user.id,
        });
        const contact = this.contactRepository.create({ ...contactObj });
        await this._logRepository.create(
            user,
            'create',
            'contact',
            parseInt(contact.id, 10),
            createDto,
            createDto,
            createDto,
        );
        return this.contactRepository.save(contact);
    }

    @Transactional()
    async update(
        id: string,
        updateDto: ContactUpdateDto,
        user: UserEntity,
    ): Promise<ContactEntity> {
        const contact = await this.contactRepository.findOne({ id });
        const oldContact = Object.assign({}, contact);
        const updatedContact = Object.assign(contact, {
            ...updateDto,
            updatedBy: user.id,
        });
        if (!contact) {
            throw new HttpException('Update failed', HttpStatus.NOT_ACCEPTABLE);
        }
        const diffs = detailedDiff(oldContact, updatedContact);
        await this._logRepository.create(
            user,
            'update',
            'company',
            parseInt(updatedContact.id, 10),
            oldContact,
            updatedContact,
            diffs,
        );

        return this.contactRepository.save(updatedContact);
    }

    async getList(
        pageOptionsDto: ContactsPageOptionsDto,
    ): Promise<ContactPageDetailDto> {
        const queryBuilder = this.contactRepository
            .createQueryBuilder('contact')
            .leftJoinAndSelect('contact.company', 'company');

        // handle query
        queryBuilder.where('contact.name ILIKE :name', {
            name: `%${pageOptionsDto.q}%`,
        });
        queryBuilder.orderBy('contact.updatedAt', pageOptionsDto.order);
        const [contacts, contactsCount] = await queryBuilder
            .skip(pageOptionsDto.skip)
            .take(pageOptionsDto.take)
            .getManyAndCount();

        const listIdContact = contacts.map((it) => it.id);
        const results = [];
        for await (const iterator of listIdContact) {
            const contact = await this.contactRepository.findOne({
                where: { id: iterator },
                relations: ['company', 'referral'],
            });
            const listIdCompany = contact.company.map((it) => it.idCompany);

            const rawData = await this._companyRepository.findByIds([
                ...listIdCompany,
            ]);
            const result = new DetailContactDto(contact);
            result.company = rawData.map((it) => new CompanyData(it));
            results.push(result);
        }
        const pageMetaDto = new PageMetaDto({
            pageOptionsDto,
            itemCount: contactsCount,
        });
        return new ContactPageDetailDto(results, pageMetaDto);
    }

    async findById(id: string): Promise<DetailContactDto> {
        const contact = await this.contactRepository.findOne({
            relations: ['company', 'referral', 'tag', 'lead'],
            where: { id },
        });
        if (!contact) {
            throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        }

        // handle company
        const listIdCompany = contact.company.map((it) => it.idCompany);
        const rawData = await this._companyRepository.findByIds(listIdCompany);
        const result = new DetailContactDto(contact);
        result.company = rawData.map((it) => new CompanyData(it));

        // handle contact referral
        const listIdReferral = contact.referral.map((it) => it.idTarget);
        const listContacts = await this.contactRepository.findByIds(
            listIdReferral,
        );
        result.referral = listContacts.map(
            (it, index) => new ReferralDto(it, contact.referral[index]),
        );

        result.lead = contact.lead.map((it) => new BasicInfoLeadDto(it));

        return result;
    }
}
