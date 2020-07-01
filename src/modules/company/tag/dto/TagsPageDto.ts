import { ApiProperty } from '@nestjs/swagger';

import { TagCompanyEntity } from '../tagcompany.entity';
import { TagCompanyDto } from './TagCompanyDto';

export class TagsPageDto {
    @ApiProperty({
        type: [TagCompanyDto],
        isArray: true,
    })
    readonly data: TagCompanyDto[];

    constructor(data: TagCompanyEntity[]) {
        this.data = data;
    }
}
