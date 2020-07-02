import { Injectable } from '@nestjs/common';

import { CompanyRepository } from '../company/company.repository';
import { ContactRepository } from '../contact/contact.repository';
import { CompanyContactRepository } from './companyContact.repository';
import { CompanyContactDto } from './dto/CompanyContactDto';

@Injectable()
export class CompanyContactService {
    constructor(
        public readonly relationRepository: CompanyContactRepository,
        public readonly companyRepository: CompanyRepository,
        public readonly contactRepository: ContactRepository,
    ) {}

    async createContact(
        contacts: CompanyContactDto[],
        idCompany: string,
    ): Promise<void> {
        for await (const contact of contacts) {
            const relationObj = new CompanyContactDto(
                contact.idContact,
                idCompany,
                contact.title,
            );
            await this.createRelation(relationObj);
        }
    }
    async createCompany(
        companies: CompanyContactDto[],
        idContact: string,
    ): Promise<void> {
        for await (const company of companies) {
            const relationObj = new CompanyContactDto(
                idContact,
                company.idCompany,
                company.title,
            );
            await this.createRelation(relationObj);
        }
    }

    async updateContact(
        contacts: CompanyContactDto[],
        idCompany: string,
    ): Promise<void> {
        const relations = await this.relationRepository.find({ idCompany });
        await this.relationRepository.remove(relations);
        const contactClean = contacts.map((it) => ({
            idCompany: it.idCompany,
            idContact: it.idContact,
            title: it.title,
        }));
        await this.createContact(contactClean, idCompany);
    }

    async updateCompany(
        companies: CompanyContactDto[],
        idContact: string,
    ): Promise<void> {
        const relations = await this.relationRepository.find({ idContact });
        await this.relationRepository.remove(relations);
        const contactClean = companies.map((it) => ({
            idCompany: it.idCompany,
            idContact: it.idContact,
            title: it.title,
        }));
        await this.createCompany(contactClean, idContact);
    }

    async createRelation(relationObj: CompanyContactDto): Promise<void> {
        const relation = this.relationRepository.create({ ...relationObj });
        await this.relationRepository.save(relation);
    }
}
