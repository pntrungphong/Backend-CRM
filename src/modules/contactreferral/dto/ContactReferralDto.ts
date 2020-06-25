'use strict';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';
import { integer } from 'aws-sdk/clients/cloudfront';
export class ContactReferralDto {

    @IsString()
    @ApiPropertyOptional()
    idTarget: string;

    @IsString()
    @ApiPropertyOptional({type: [{}]})
    hastag: string;
}
