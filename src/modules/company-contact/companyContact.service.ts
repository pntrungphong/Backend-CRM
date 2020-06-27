import { Injectable } from '@nestjs/common';

import { CompanyContactRepository } from './companyContact.repository';
import { CompanyContactDto } from './dto/CompanyContactDto';

@Injectable()
export class CompanyContactService {
    constructor(public readonly relationRepository: CompanyContactRepository) {}

    async createContact(
        contacts: CompanyContactDto[],
        companyId: string,
    ): Promise<void> {
        for await (const contact of contacts) {
            await this.createRelation(contact.contactId, companyId);
        }
    }
    async createCompany(
        companies: CompanyContactDto[],
        contactId: string,
    ): Promise<void> {
        for await (const company of companies) {
            await this.createRelation(contactId, company.companyId);
        }
    }

    async updateContact(
        contacts: CompanyContactDto[],
        companyId: string,
    ): Promise<void> {
        const relations = await this.relationRepository.find({ companyId });
        await this.relationRepository.remove(relations);
        const contactClean = contacts.map((it) => ({
            companyId: it.companyId,
            contactId: it.contactId,
        }));
        await this.createContact(contactClean, companyId);
    }

    async updateCompany(
        companies: CompanyContactDto[],
        contactId: string,
    ): Promise<void> {
        const relations = await this.relationRepository.find({ contactId });
        await this.relationRepository.remove(relations);
        const contactClean = companies.map((it) => ({
            companyId: it.companyId,
            contactId: it.contactId,
        }));
        await this.createCompany(contactClean, contactId);
    }

    async createRelation(contactId: string, companyId: string): Promise<void> {
        const relationObj = { contactId, companyId };
        const relation = this.relationRepository.create({ ...relationObj });
        await this.relationRepository.save(relation);
    }
}
