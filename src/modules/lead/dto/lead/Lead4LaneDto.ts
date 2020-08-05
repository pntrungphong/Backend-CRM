'use strict';

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { LeadHovDto } from './LeadHovDto';
import { LeadLMDto } from './LeadLMDto';
import { LeadPCDto } from './LeadPCDto';
import { LeadPHDto } from './LeadPHDto';
export class Lead4LaneDto {
    @ApiPropertyOptional({ type: [LeadHovDto] })
    leadHov: LeadHovDto[];

    @ApiPropertyOptional({ type: [LeadLMDto] })
    leadLM: LeadLMDto[];

    @ApiPropertyOptional({ type: [LeadPCDto] })
    leadPC: LeadPCDto[];

    @ApiPropertyOptional({ type: [LeadPHDto] })
    leadPH: LeadPHDto[];
}
