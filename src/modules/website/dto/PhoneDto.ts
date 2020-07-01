'use strict';

import { ApiPropertyOptional } from '@nestjs/swagger';

export class PhoneDto {
    @ApiPropertyOptional()
    number: string;

    @ApiPropertyOptional()
    type: string;
}
