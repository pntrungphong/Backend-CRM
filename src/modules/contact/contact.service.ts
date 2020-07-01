import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FindConditions } from 'typeorm';

import { PageMetaDto } from '../../common/dto/PageMetaDto';
import { AwsS3Service } from '../../shared/services/aws-s3.service';
import { ValidatorService } from '../../shared/services/validator.service';
import { CompanyRepository } from '../company/company.repository';
import { GeneralInfoDto } from '../company/dto/GeneralInfoDto';
import { UserEntity } from '../user/user.entity';
import { ContactEntity } from './contact.entity';
import { ContactRepository } from './contact.repository';
import { ContactsPageDto } from './dto/ContactsPageDto';
import { ContactsPageOptionsDto } from './dto/ContactsPageOptionsDto';
import { ContactUpdateDto } from './dto/ContactUpdateDto';
import { DetailContactDto } from './dto/DetailContactDto';
import { ContactReferralService } from './referral/contactreferral.service';

@Injectable()
export class ContactService {
    constructor(
        public readonly contactRepository: ContactRepository,
        public readonly validatorService: ValidatorService,
        public readonly awsS3Service: AwsS3Service,
        private _contactReferralService: ContactReferralService,
        private _companyRepository: CompanyRepository,
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

        return this.contactRepository.save(updatedContact);
    }

    async getList(
        pageOptionsDto: ContactsPageOptionsDto,
    ): Promise<ContactsPageDto> {
        const queryBuilder = this.contactRepository.createQueryBuilder(
            'contact',
        );

        // handle query
        queryBuilder.where('1 = 1');
        queryBuilder.andWhere('LOWER (contact.name) LIKE :name', {
            name: `%${pageOptionsDto.q.toLowerCase()}%`,
        });
        queryBuilder.orderBy('contact.updated_at', pageOptionsDto.order);
        const [contacts, contactsCount] = await queryBuilder
            .skip(pageOptionsDto.skip)
            .take(pageOptionsDto.take)
            .getManyAndCount();

        const pageMetaDto = new PageMetaDto({
            pageOptionsDto,
            itemCount: contactsCount,
        });
        return new ContactsPageDto(contacts.toDtos(), pageMetaDto);
    }

    async findById(id: string): Promise<DetailContactDto> {
        const contact = await this.contactRepository.findOne({
            where: { id },
            relations: ['company', 'referral', 'tag'],
        });

        const listIdCompany = contact.company.map((it) => it.idCompany);
        const rawDatas = await this._companyRepository.findByIds(listIdCompany);
        const result = new DetailContactDto(contact);
        result.company = rawDatas.map((it) => new GeneralInfoDto(it));

        if (!contact) {
            throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        }
        return result;
    }
}
