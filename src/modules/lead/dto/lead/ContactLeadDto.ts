'use strict';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString } from 'class-validator';
export class ContactLeadDto {
    @IsString()
    @ApiPropertyOptional({example: "1"})
    idContact: string;
}
