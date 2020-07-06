import { Injectable } from '@nestjs/common';

import { TagsPageDto } from './dto/TagsPageDto';
import { TagRepository } from './tag.repository';
@Injectable()
export class TagService {
    constructor(public readonly tagRepository: TagRepository) {}

    async getList(name: string): Promise<TagsPageDto> {
        const queryBuilder = this.tagRepository
            .createQueryBuilder('tag_')
            .where('tag_.tag ILIKE :name', {
                name: `%${name}%`,
            });
        const tags = await queryBuilder.take(15).getMany();
        return new TagsPageDto(tags);
    }
}
