'use strict';

import { ApiPropertyOptional } from '@nestjs/swagger';

export class WebsiteDto {
    @ApiPropertyOptional()
    url: string;

    @ApiPropertyOptional()
    type: string;
}
