'use strict';

import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

import { CompanyEntity } from '../../company/company.entity';

export class LinkCompanyContactDto {
    @IsOptional()
    @ApiProperty()
    id: string;

    @IsOptional()
    @ApiProperty()
    name: string;
    constructor(company: CompanyEntity) {
        this.id = company.id;
        this.name = company.name;
    }
}
