'use strict';

import { ApiPropertyOptional } from '@nestjs/swagger';

export class RankRevisionDto {
    @ApiPropertyOptional()
    rank: number;

    @ApiPropertyOptional()
    reason: string;

    @ApiPropertyOptional()
    touchPoint: number;

    @ApiPropertyOptional()
    updatedBy: string;

    @ApiPropertyOptional()
    updatedAt: string;
}
