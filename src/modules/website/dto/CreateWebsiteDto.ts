'use strict';

import { ApiPropertyOptional } from '@nestjs/swagger';

import { WebsiteEntity } from '../website.entity';

export class CreateWebsiteDto {
    @ApiPropertyOptional()
    name: string;

    @ApiPropertyOptional()
    url: string;

    constructor(website: WebsiteEntity) {
        this.name = website.name;
        this.url = website.url;
    }
}
