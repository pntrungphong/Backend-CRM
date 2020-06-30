import { Injectable } from '@nestjs/common';

import { TagContactDto } from './dto/TagContactDto';
import { TagContactRepository } from './tagcontact.repository';
@Injectable()
export class TagContactService {
    constructor(public readonly tagContactRepository: TagContactRepository) { }
    async create(createTagDto: TagContactDto[], idContact: string) {
        for await (const tag of createTagDto) {
            const tagContactObj = { ...tag, idContact };
            const tagContact = this.tagContactRepository.create({
                ...tagContactObj,
            });
            this.tagContactRepository.save(tagContact);
        }
    }

    async update(updateDto: TagContactDto[], idContact: string) {
        const relations = await this.tagContactRepository.find({
            idContact,
        });
        await this.tagContactRepository.remove(relations);
        const contactClean = updateDto.map((it) => ({
            tag: it.tag,
        }));
        await this.create(contactClean, idContact);
    }
}
