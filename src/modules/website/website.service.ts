import { Injectable } from '@nestjs/common';

import { AwsS3Service } from '../../shared/services/aws-s3.service';
import { ValidatorService } from '../../shared/services/validator.service';
import { CompanyWebsiteRepository } from './company.website.repository';
import { ContactWebsiteRepository } from './contact.website.repository';
import { WebsiteDto } from './dto/WebsiteDto';

@Injectable()
export class WebsiteService {
    constructor(
        public readonly contactWebsiteRepository: ContactWebsiteRepository,
        public readonly companyWebsiteRepository: CompanyWebsiteRepository,
        public readonly validatorService: ValidatorService,
        public readonly awsS3Service: AwsS3Service,
    ) { }

    async create(
        createDto: WebsiteDto[],
        idSource: string,
        // type: string,
    ): Promise<WebsiteDto[]> {
        const websites = [];
        for await (const iterator of createDto) {
            const website = this.contactWebsiteRepository.create({
                // ...createDto[i],
                ...iterator,
                idSource,
            });
            this.contactWebsiteRepository.save(website);
            websites.push(website);
        }
        return websites as WebsiteDto[];
    }

    // async update(
    //     updateDto: WebsiteDto[],
    //     idSource: string,
    //     type: string
    // ): Promise<any> {
    //     for (let i = 0; i < updateDto.length; i++) {
    //         const test = this.contactWebsiteRepository.save(updateDto[i]);
    //         console.table(test);
    //     }
    //     // const contact = await this.contactRepository.findOne({ id });
    //     // const updatedContact = Object.assign(contact, {
    //     //     ...contactUpdateDto,
    //     //     updatedBy: user.id,
    //     //     phone: contactUpdateDto.phone.join('|'),
    //     //     email: contactUpdateDto.email.join('|'),
    //     //     address: contactUpdateDto.address.join('|'),
    //     // });
    //     return null;
    // }
}
