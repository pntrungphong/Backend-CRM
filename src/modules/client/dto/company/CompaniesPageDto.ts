import { ApiProperty } from '@nestjs/swagger';

import { PageMetaDto } from '../../../../common/dto/PageMetaDto';
import { CompanyDto } from './CompanyDto';

export class CompaniesPageDto {
    @ApiProperty({
        type: CompanyDto,
        isArray: true,
    })
    readonly data: CompanyDto[];

    @ApiProperty()
    readonly meta: PageMetaDto;

    constructor(data: CompanyDto[], meta: PageMetaDto) {
        this.data = data;
        this.meta = meta;
    }
}
