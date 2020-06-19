import { Injectable } from '@nestjs/common';
import { FindConditions } from 'typeorm';

import { AwsS3Service } from '../../shared/services/aws-s3.service';
import { ValidatorService } from '../../shared/services/validator.service';
import { UserEntity } from '../user/user.entity';
import { ContactEntity } from './contact.entity';
import { ContactRepository } from './contact.repository';
import { ContactCreateDto } from './dto/ContactCreateDto';
import { ContactUpdateDto } from './dto/ContactUpdateDto';

@Injectable()
export class ContactService {
    constructor(
        public readonly contactRepository: ContactRepository,
        public readonly validatorService: ValidatorService,
        public readonly awsS3Service: AwsS3Service,
    ) {}

    /**
     * Find single contact
     */
    findOne(findData: FindConditions<ContactEntity>): Promise<ContactEntity> {
        return this.contactRepository.findOne(findData);
    }

    async createContact(
        contactCreateDto: ContactCreateDto,
        user: UserEntity,
    ): Promise<ContactEntity> {
        const contactObj = Object.assign(contactCreateDto, {
            create_by: user.id,
        });
        const contact = this.contactRepository.create({ ...contactObj });
        return this.contactRepository.save(contact);
    }

    async updateContact(
        id: string,
        contactUpdateDto: ContactUpdateDto,
        user: UserEntity,
    ): Promise<ContactEntity> {
        const contact = await this.contactRepository.findOne({ id });
        const updatedContact = Object.assign(contact, {
            ...contactUpdateDto,
            update_by: user.id,
            update_at: Date.now(),
        });
        return this.contactRepository.save(updatedContact);
    }
}
