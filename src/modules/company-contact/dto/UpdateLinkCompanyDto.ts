'use strict';

import { ApiPropertyOptional } from '@nestjs/swagger';

export class LinkContactDto {
    @ApiPropertyOptional()
    contactId: string;
}
