'use strict';

import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class InfoOnHovDto {
    @ApiPropertyOptional({ example: 0 })
    @IsNumber()
    onHov: number;
}
