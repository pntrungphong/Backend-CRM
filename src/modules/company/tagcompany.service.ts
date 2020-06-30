import { Injectable } from '@nestjs/common';

import { TagCompanyDto } from './dto/TagCompanyDto';
// import { TagCompanyDto } from './dto/TagCompanyDto';
import { TagCompanyRepository } from './tagcompany.repository';
import { promises } from 'fs';
@Injectable()
export class TagCompanyService {
    constructor(public readonly tagcompanyRepository: TagCompanyRepository) {}
    async create(createTagDto: TagCompanyDto[], idCompany: string) {
        for await (const tag of createTagDto) {
            const tagCompanyObj = { ...tag, idCompany };
            const tagCompany = this.tagcompanyRepository.create({
                ...tagCompanyObj,
            });
            this.tagcompanyRepository.save(tagCompany);
        }
    }

    async update(updateDto: TagCompanyDto[], idCompany: string) {
        const relations = await this.tagcompanyRepository.find({
            idCompany,
        });
        await this.tagcompanyRepository.remove(relations);
        const contactClean = updateDto.map((it) => ({
            tag: it.tag,
        }));
        await this.create(contactClean, idCompany);
    }
}
