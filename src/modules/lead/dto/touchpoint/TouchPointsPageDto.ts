import { ApiProperty } from '@nestjs/swagger';

import { PageMetaDto } from '../../../../common/dto/PageMetaDto';
import { TouchPointDto } from './TouchPointDto';

export class TouchPointsPageDto {
    @ApiProperty({
        type: TouchPointDto,
        isArray: true,
    })
    readonly data: TouchPointDto[];

    @ApiProperty()
    readonly meta: PageMetaDto;

    constructor(data: TouchPointDto[], meta: PageMetaDto) {
        this.data = data;
        this.meta = meta;
    }
}
