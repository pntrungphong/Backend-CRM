import { ApiProperty } from '@nestjs/swagger';

import { PageMetaDto } from '../../../../common/dto/PageMetaDto';
import { ContactDto } from './ContactDto';

export class ContactsPageDto {
    @ApiProperty({
        type: ContactDto,
        isArray: true,
    })
    readonly data: ContactDto[];

    @ApiProperty()
    readonly meta: PageMetaDto;

    constructor(data: ContactDto[], meta: PageMetaDto) {
        this.data = data;
        this.meta = meta;
    }
}
