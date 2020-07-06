import { ApiProperty } from '@nestjs/swagger';

import { PageMetaDto } from '../../../../common/dto/PageMetaDto';
import { DetailContactDto } from './DetailContactDto';
export class ContactPageDetailDto {
    @ApiProperty({
        type: DetailContactDto,
        isArray: true,
    })
    readonly data: DetailContactDto[];

    @ApiProperty()
    readonly meta: PageMetaDto;

    constructor(data: DetailContactDto[], meta: PageMetaDto) {
        this.data = data;
        this.meta = meta;
    }
}
