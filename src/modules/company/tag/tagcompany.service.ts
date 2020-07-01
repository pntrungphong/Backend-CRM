import { Injectable } from '@nestjs/common';

import { TagCompanyDto } from './dto/TagCompanyDto';
import { TagsPageDto } from './dto/TagsPageDto';
import { TagCompanyRepository } from './tagcompany.repository';
@Injectable()
export class TagCompanyService {
    constructor(public readonly tagcompanyRepository: TagCompanyRepository) {}

    async create(
        createTagDto: TagCompanyDto[],
        idCompany: string,
    ): Promise<void> {
        for await (const tag of createTagDto) {
            const tagCompanyObj = { ...tag, idCompany };
            const tagCompany = this.tagcompanyRepository.create({
                ...tagCompanyObj,
            });
            await this.tagcompanyRepository.save(tagCompany);
        }
    }

    async update(updateDto: TagCompanyDto[], idCompany: string): Promise<void> {
        const relations = await this.tagcompanyRepository.find({
            idCompany,
        });
        await this.tagcompanyRepository.remove(relations);
        const contactClean = updateDto.map((it) => ({
            tag: it.tag,
        }));
        await this.create(contactClean, idCompany);
    }

    async getList(name: string): Promise<TagsPageDto> {
        const queryBuilder = this.tagcompanyRepository
            .createQueryBuilder('tag_company')
            .where('tag_company.tag ILIKE :name', {
                name: `%${name}%`,
            });
        const tags = await queryBuilder.take(15).getMany();
        return new TagsPageDto(tags);
    }
}
