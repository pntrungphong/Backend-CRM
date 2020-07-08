'use strict';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString } from 'class-validator';
export class ContactLeadDto {
    @IsString()
    @ApiPropertyOptional()
    idContact: string;
}
