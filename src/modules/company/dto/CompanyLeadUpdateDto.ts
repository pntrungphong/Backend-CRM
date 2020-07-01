'use strict';

import { ApiPropertyOptional } from '@nestjs/swagger';

export class CompanyLeadUpdateDto {
    @ApiPropertyOptional()
    idCompany: string;
}
