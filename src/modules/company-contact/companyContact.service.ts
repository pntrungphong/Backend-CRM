import { Injectable } from '@nestjs/common';

import { CompanyRepository } from '../company/company.repository';
import { CompanyDto } from '../company/dto/CompanyDto';
import { ContactRepository } from '../contact/contact.repository';
import { ContactDto } from '../contact/dto/ContactDto';
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

    async getCompanyByIdContact(contactId: string): Promise<CompanyDto[]> {
        const listIdCompany = await this.relationRepository.find({ contactId });
        const abc = [];
        for await (const iterator of listIdCompany) {
            const nameCompany = await this.companyRepository.findOne({
                id: iterator.companyId,
            });
            abc.push(nameCompany);
        }
        return abc.toDtos();
    }
    async getContactByIdCompany(companyId: string): Promise<ContactDto[]> {
        const listIdContact = await this.relationRepository.find({ companyId });
        const abc = [];
        for await (const iterator of listIdContact) {
            const nameContact = await this.contactRepository.findOne({
                id: iterator.contactId,
            });
            abc.push(nameContact);
        }
        return abc.toDtos();
    }
}
