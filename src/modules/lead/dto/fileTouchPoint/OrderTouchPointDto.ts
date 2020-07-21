'use strict';

import { ApiPropertyOptional } from '@nestjs/swagger';

import { TouchPointEntity } from '../../../../modules/lead/entity/Touchpoint/touchpoint.entity';

export class OrderTouchPointDto {
    @ApiPropertyOptional()
    order: number;
    constructor(touchPoint: TouchPointEntity) {
        this.order = touchPoint.order;
    }
}
