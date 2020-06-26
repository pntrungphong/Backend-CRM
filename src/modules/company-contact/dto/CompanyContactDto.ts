'use strict';

import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class CompanyContactDto {
    @IsOptional()
    @ApiProperty()
    companyId: string;

    @IsOptional()
    @ApiProperty()
    contactId: string;
}
