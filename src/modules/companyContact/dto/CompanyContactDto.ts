'use strict';

import { ApiPropertyOptional } from '@nestjs/swagger';

export class CompanyContactDto {
    @ApiPropertyOptional()
    readonly status: boolean;
}
