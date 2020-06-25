'use strict';

import { ApiPropertyOptional } from '@nestjs/swagger';

export class LinkContactDto {
    @ApiPropertyOptional()
    status: boolean;
    @ApiPropertyOptional()
    idContact: string;
}
