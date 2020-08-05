'use strict';

import { ApiPropertyOptional } from '@nestjs/swagger';

import { LeadLaneDto } from './LeadLaneDto';

export class Lead4LaneDto {
    @ApiPropertyOptional({ type: [LeadLaneDto] })
    leadHov: LeadLaneDto[];

    @ApiPropertyOptional({ type: [LeadLaneDto] })
    leadLM: LeadLaneDto[];

    @ApiPropertyOptional({ type: [LeadLaneDto] })
    leadPC: LeadLaneDto[];

    @ApiPropertyOptional({ type: [LeadLaneDto] })
    leadPH: LeadLaneDto[];
}
