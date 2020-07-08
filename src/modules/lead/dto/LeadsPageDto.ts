import { ApiProperty } from '@nestjs/swagger';

import { PageMetaDto } from '../../../common/dto/PageMetaDto';
import { LeadDto } from './LeadDto';

export class LeadsPageDto {
    @ApiProperty({
        type: LeadDto,
        isArray: true,
    })
    readonly data: LeadDto[];

    @ApiProperty()
    readonly meta: PageMetaDto;

    constructor(data: LeadDto[], meta: PageMetaDto) {
        this.data = data;
        this.meta = meta;
    }
}
