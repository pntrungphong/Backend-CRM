import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FindConditions } from 'typeorm';
import { ContactRepository } from '../repository/contact.repository';
import { CompanyRepository } from '../repository/company.repository';
import { ContactEntity } from '../entity/contact.entity';
import { ContactUpdateDto } from '../dto/contact/ContactUpdateDto';
import { UserEntity } from '../../user/user.entity';
import { ContactsPageOptionsDto } from '../dto/contact/ContactsPageOptionsDto';
import { ContactPageDetailDto } from '../dto/contact/ContactsPageDetailDto';
import { DetailContactDto } from '../dto/contact/DetailContactDto';
import { PageMetaDto } from '../../../common/dto/PageMetaDto';
import { ReferralDto } from '../dto/contact-referral/ReferralDto';
import { GeneralInfoDto as Companydata } from '../dto/company/GeneralInfoDto';
import { TagRepository } from '../../tag/tag.repository';

@Injectable()
export class ContactService {
    constructor(
        public readonly contactRepository: ContactRepository,
        private _companyRepository: CompanyRepository,
        private _tagRepository:TagRepository
    ) {}

    findOne(findData: FindConditions<ContactEntity>): Promise<ContactEntity> {
        return this.contactRepository.findOne(findData);
    }

    async create(
        createDto: ContactUpdateDto,
        user: UserEntity,
    ): Promise<ContactEntity> {
        const contactObj = Object.assign(createDto, {
            createdBy: user.id,
            updatedBy: user.id,
        });
        for await (const iterator of createDto.tag) {
            const tag= await this._tagRepository.find({
                where:{tag:iterator.tag}
            })
            console.table(tag)
        }


        const contact = this.contactRepository.create({ ...contactObj });
        return this.contactRepository.save(contact);
    }

    async update(
        id: string,
        updateDto: ContactUpdateDto,
        user: UserEntity,
    ): Promise<ContactEntity> {
        const contact = await this.contactRepository.findOne({ id });
        const updatedContact = Object.assign(contact, {
            ...updateDto,
            updatedBy: user.id,
        });
        if (!contact) {
            throw new HttpException(
                'Cập nhật thất bại',
                HttpStatus.NOT_ACCEPTABLE,
            );
        }
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
            console.table(listIdCompany)
            const rawDatas = await this._companyRepository.findByIds([
                ...listIdCompany,
            ]);
            const result = new DetailContactDto(contact);
            result.company = rawDatas.map((it) => new Companydata(it));
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
            relations: ['company', 'referral', 'tag'],
            where: { id },
        });
        if (!contact) {
            throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        }

        // handle company
        const listIdCompany = contact.company.map((it) => it.idCompany);
        const rawDatas = await this._companyRepository.findByIds(listIdCompany);
        const result = new DetailContactDto(contact);
        result.company = rawDatas.map((it) => new Companydata(it));

        // handle contact referral
        const listIdReferral = contact.referral.map((it) => it.idTarget);
        const listContacts = await this.contactRepository.findByIds(
            listIdReferral,
        );
        result.referral = listContacts.map(
            (it, index) => new ReferralDto(it, contact.referral[index]),
        );

        return result;
    }
}
