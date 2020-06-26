'use strict';

import { ApiPropertyOptional } from '@nestjs/swagger';

export class LinkCompanyDto {
    @ApiPropertyOptional()
    companyId: string;
}
