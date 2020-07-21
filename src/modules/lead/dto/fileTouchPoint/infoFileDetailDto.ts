'use strict';

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { FileDto } from '../../../../modules/file/dto/fileDto';
import { OrderTouchPointDto } from './OrderTouchPointDto';

export class InfoFileDetailDto {
    @ApiProperty()
    fileId: number;

    @ApiProperty()
    touchPointId: number;

    @ApiProperty()
    leadId: number;

    @ApiProperty()
    type: string;

    @ApiProperty()
    note: string;

    @ApiPropertyOptional({ type: [FileDto] })
    file: FileDto;
    @ApiPropertyOptional({ type: [OrderTouchPointDto] })
    touchpoint: OrderTouchPointDto;
}
