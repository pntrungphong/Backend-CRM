import { Injectable } from '@nestjs/common';

import { AwsS3Service } from '../../shared/services/aws-s3.service';
import { ValidatorService } from '../../shared/services/validator.service';
import { CompanyWebsiteRepository } from './company.website.repository';
import { ContactWebsiteRepository } from './contact.website.repository';
import { CreateWebsiteDto } from './dto/CreateWebsiteDto';
import { WebsiteDto } from './dto/WebsiteDto';

@Injectable()
export class WebsiteService {
    // private _repository = {};
    constructor(
        public readonly companyWebRepo: CompanyWebsiteRepository,
        public readonly contactWebRepo: ContactWebsiteRepository,
        public readonly validatorService: ValidatorService,
        public readonly awsS3Service: AwsS3Service,
    ) {
        // this._repository = {
        //     company: companyWebsiteRepository,
        //     contact: contactWebsiteRepository,
        // };
    }

    async create(
        createDto: CreateWebsiteDto[],
        idSource: string,
        type: string,
    ): Promise<void> {
        if (type === 'contact') {
            for await (const iterator of createDto) {
                const insert = {
                    idSource,
                    url: iterator.url,
                    name: iterator.name,
                };
                const website = this.contactWebRepo.create(insert);
                await this.contactWebRepo.save(website);
            }
        } else if (type === 'company') {
            for await (const iterator of createDto) {
                const insert = {
                    idSource,
                    url: iterator.url,
                    name: iterator.name,
                };
                const website = this.companyWebRepo.create(insert);
                await this.companyWebRepo.save(website);
            }
        }
    }

    async update(
        updateDto: WebsiteDto[],
        idSource: string,
        type: string,
    ): Promise<void> {
        for await (const iterator of updateDto) {
            if (
                iterator.id !== null &&
                iterator.id !== 'undefined' &&
                iterator.id !== ''
            ) {
                if (type === 'contact') {
                    await this.contactWebRepo.update(iterator.id, {
                        ...iterator,
                        idSource,
                    });
                } else if (type === 'company') {
                    await this.companyWebRepo.update(iterator.id, {
                        ...iterator,
                        idSource,
                    });
                }
            } else {
                await this.create([iterator], idSource, type);
            }
        }
    }
}
