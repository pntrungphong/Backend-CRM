'use strict';

import {ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';
import {IsOptional} from 'class-validator';
import { RankRevisionDto } from '../../../../modules/lead/field/RankRevisionDto';

export class LeadChangeRankDto {
    @IsOptional()
    @ApiPropertyOptional()
    rank: string;
    @IsOptional()
    @ApiProperty({ type: [RankRevisionDto] })
    rankRevision: RankRevisionDto;
}
