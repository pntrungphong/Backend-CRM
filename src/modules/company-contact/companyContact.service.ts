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
        idCompany: string,
    ): Promise<void> {
        for await (const contact of contacts) {
            await this.createRelation(contact.idContact, idCompany);
        }
    }
    async createCompany(
        companies: CompanyContactDto[],
        idContact: string,
    ): Promise<void> {
        for await (const company of companies) {
            await this.createRelation(idContact, company.idCompany);
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
        }));
        await this.createCompany(contactClean, idContact);
    }

    async createRelation(idContact: string, idCompany: string): Promise<void> {
        const relationObj = { idContact, idCompany };
        const relation = this.relationRepository.create({ ...relationObj });
        await this.relationRepository.save(relation);
    }

    async getCompanyByIdContact(idContact: string): Promise<CompanyDto[]> {
        const listIdCompany = await this.relationRepository.find({ idContact });
        const abc = [];
        for await (const iterator of listIdCompany) {
            const nameCompany = await this.companyRepository.findOne({
                id: iterator.idCompany,
            });
            abc.push(nameCompany);
        }
        return abc.toDtos();
    }
    async getContactByIdCompany(idCompany: string): Promise<ContactDto[]> {
        const listIdContact = await this.relationRepository.find({ idCompany });
        const abc = [];
        for await (const iterator of listIdContact) {
            const nameContact = await this.contactRepository.findOne({
                id: iterator.idContact,
            });
            abc.push(nameContact);
        }
        return abc.toDtos();
    }
}
