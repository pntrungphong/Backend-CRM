'use strict';

import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class CompanyContactDto {
    @IsOptional()
    @ApiProperty()
    idCompany: string;

    @IsOptional()
    @ApiProperty()
    idContact: string;

    @IsOptional()
    @ApiProperty()
    title: string;

    constructor(idContact: string, idCompany: string, title: string) {
        this.idCompany = idCompany;
        this.idContact = idContact;
        this.title = title;
    }
}
