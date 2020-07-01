'use strict';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
export class ContactReferralDto {
    @IsString()
    @ApiProperty()
    idTarget: string;

    @ApiProperty({ type: [] })
    hastag: string;
}
