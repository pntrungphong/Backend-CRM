import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FindConditions } from 'typeorm';

import { PageMetaDto } from '../../common/dto/PageMetaDto';
import { AwsS3Service } from '../../shared/services/aws-s3.service';
import { ValidatorService } from '../../shared/services/validator.service';
import { UserEntity } from '../user/user.entity';
import { ContactWebsiteRepository } from '../website/contact.website.repository';
import { ContactEntity } from './contact.entity';
import { ContactRepository } from './contact.repository';
import { ContactDto } from './dto/ContactDto';
import { ContactsPageDto } from './dto/ContactsPageDto';
import { ContactsPageOptionsDto } from './dto/ContactsPageOptionsDto';
import { ContactUpdateDto } from './dto/ContactUpdateDto';

@Injectable()
export class ContactService {
    constructor(
        public readonly contactRepository: ContactRepository,
        public readonly websiteRepository: ContactWebsiteRepository,
        public readonly validatorService: ValidatorService,
        public readonly awsS3Service: AwsS3Service,
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
            phone: createDto.phone.join('|'),
            email: createDto.email.join('|'),
            address: createDto.address.join('|'),
        });
        const contact = this.contactRepository.create({ ...contactObj });
        return this.contactRepository.save(contact);
    }

    async update(
        id: string,
        contactUpdateDto: ContactUpdateDto,
        user: UserEntity,
    ): Promise<ContactEntity> {
        const contact = await this.contactRepository.findOne({ id });
        const updatedContact = Object.assign(contact, {
            ...contactUpdateDto,
            updatedBy: user.id,
            phone: contactUpdateDto.phone.join('|'),
            email: contactUpdateDto.email.join('|'),
            address: contactUpdateDto.address.join('|'),
        });
        return this.contactRepository.save(updatedContact);
    }

    async getList(
        pageOptionsDto: ContactsPageOptionsDto,
    ): Promise<ContactsPageDto> {
        const queryBuilder = this.contactRepository
            .createQueryBuilder('contact')
            .leftJoinAndSelect('contact.website', 'website');
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

    async findById(id: string): Promise<ContactDto> {
        const contact = await this.contactRepository.findOne({
            where: { id },
            relations: ['website'],
        });
        if (!contact) {
            throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        }
        return contact.toDto() as ContactDto;
    }
}
