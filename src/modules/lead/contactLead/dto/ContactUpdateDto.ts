'use strict';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString } from 'class-validator';
export class ContactLeadUpdateDto {
    @IsString()
    @ApiPropertyOptional()
    idContact: string;
}
