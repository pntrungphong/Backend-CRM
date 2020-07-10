'use strict';

import { ApiPropertyOptional } from '@nestjs/swagger';
import { ContactEntity } from '../../client/entity/contact.entity';
import { TagEntity } from '../../tag/tag.entity';


export class InfoLeadTagDto {
    @ApiPropertyOptional()
    tag: string;

    @ApiPropertyOptional()
    id: number;

    constructor(tag: TagEntity) {
        this.id = tag.id;
        this.tag=tag.tag
    }
}
