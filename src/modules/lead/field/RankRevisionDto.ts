'use strict';

import { ApiPropertyOptional } from '@nestjs/swagger';

export class RankRevisionDto {
    @ApiPropertyOptional()
    rank: number;

    @ApiPropertyOptional()
    reason: string;

    @ApiPropertyOptional()
    touchpoint:number
    
    @ApiPropertyOptional()
    updatedBy:string
    
    @ApiPropertyOptional()
    updatedAt:string
}
