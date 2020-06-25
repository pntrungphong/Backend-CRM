'use strict';

import { ApiPropertyOptional } from '@nestjs/swagger';

export class LinkCompanyDto {
    @ApiPropertyOptional()
    status: boolean;
    @ApiPropertyOptional()
    idCompany: string;
}
