import { ApiProperty } from '@nestjs/swagger';

import { TagDto } from './TagDto';

export class TagsPageDto {
    @ApiProperty({
        type: [TagDto],
        isArray: true,
    })
    readonly data: TagDto[];

    constructor(data: TagDto[]) {
        this.data = data;
    }
}
