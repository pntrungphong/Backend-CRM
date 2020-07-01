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
}
