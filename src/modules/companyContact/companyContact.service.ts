import { Injectable } from '@nestjs/common';

import { CompanyContactRepository } from './companyContact.repository';
import { LinkContactDto } from './dto/UpdateLinkCompanyDto';
import { LinkCompanyDto } from './dto/UpdateLinkContactDto';

@Injectable()
export class LinkCompanyContactService {
    constructor(
        public readonly companyContactRepository: CompanyContactRepository,
    ) {}
    async createContact(createContactDto: LinkContactDto[], idCompany: string) {
        for await (const tag of createContactDto) {
            const tagCompanyObj = {
                ...tag,
                companyId: idCompany,
                contactId: tag.idContact,
            };
            const tagCompany = this.companyContactRepository.create({
                ...tagCompanyObj,
            });
            console.table(tagCompany);
            await this.companyContactRepository.save(tagCompany);
        }
    }
    async createCompany(createContactDto: LinkCompanyDto[], idContact: string) {
        for await (const tag of createContactDto) {
            const tagCompanyObj = {
                ...tag,
                contactId: idContact,
                companyId: tag.idCompany,
            };
            const tagCompany = this.companyContactRepository.create({
                ...tagCompanyObj,
            });
            console.table(tagCompany);
            await this.companyContactRepository.save(tagCompany);
        }
    }
}
