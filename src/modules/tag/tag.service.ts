import { Injectable } from '@nestjs/common';

import { TagRepository } from './tag.repository';
@Injectable()
export class TagService {
    constructor(public readonly tagRepository: TagRepository) {}

    // async create(
    //     createTagDto: TagDto[],
    //     id: string,
    // ): Promise<void> {
    //     for await (const tagDto of createTagDto) {
    //         const tagObj = { ...tagDto, id };
    //         const tag = this.tagRepository.create({
    //             ...tagObj,
    //         });
    //         await this.tagRepository.save(tag);
    //     }
    // }

    // async update(updateDto: TagDto[], id: string): Promise<void> {
    //     const relations = await this.tagRepository.find({
    //         id,
    //     });
    //     await this.tagRepository.remove(relations);
    //     const contactClean = updateDto.map((it) => ({
    //         tag: it.tag,
    //     }));
    //     await this.create(contactClean, id);
    // }

    // async getList(name: string): Promise<TagsPageDto> {
    //     const queryBuilder = this.tagRepository
    //         .createQueryBuilder('tag_')
    //         .where('tag_.tag ILIKE :name', {
    //             name: `%${name}%`,
    //         });
    //     const tags = await queryBuilder.take(15).getMany();
    //     return new TagsPageDto(tags);
    // }
}
