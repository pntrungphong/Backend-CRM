'use strict';

import { ApiPropertyOptional } from '@nestjs/swagger';

import { WebsiteEntity } from '../website.entity';

export class WebsiteDto {
    @ApiPropertyOptional()
    name: string;

    @ApiPropertyOptional()
    id: string;

    @ApiPropertyOptional()
    url: string;

    constructor(website: WebsiteEntity) {
        this.name = website.name;
        this.url = website.url;
        this.id = website.id;
    }
}
