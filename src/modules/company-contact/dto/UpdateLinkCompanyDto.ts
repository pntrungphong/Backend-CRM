'use strict';

import { ApiPropertyOptional } from '@nestjs/swagger';

export class LinkContactDto {
    @ApiPropertyOptional()
    idContact: string;

    @ApiPropertyOptional()
    title: string;
}
