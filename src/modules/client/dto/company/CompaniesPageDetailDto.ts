import { ApiProperty } from '@nestjs/swagger';

import { PageMetaDto } from '../../../../common/dto/PageMetaDto';
import { DetailCompanyDto } from './DetailCompanyDto';

export class CompaniesPageDetailDto {
    @ApiProperty({
        type: DetailCompanyDto,
        isArray: true,
    })
    readonly data: DetailCompanyDto[];

    @ApiProperty()
    readonly meta: PageMetaDto;

    constructor(data: DetailCompanyDto[], meta: PageMetaDto) {
        this.data = data;
        this.meta = meta;
    }
}
