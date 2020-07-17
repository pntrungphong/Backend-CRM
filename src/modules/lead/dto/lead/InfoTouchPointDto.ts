'use strict';

import { ApiPropertyOptional } from '@nestjs/swagger';

import { TouchPointEntity } from '../../../../modules/lead/entity/Touchpoint/touchpoint.entity';

export class InfoTouchPointDto {
    @ApiPropertyOptional()
    id: string;
    @ApiPropertyOptional()
    order: number;

    @ApiPropertyOptional()
    goal: string;

    @ApiPropertyOptional()
    status: string;

    @ApiPropertyOptional()
    note: string;

    @ApiPropertyOptional()
    review: string;

    @ApiPropertyOptional()
    meetingDate: Date;

    constructor(touchPoint: TouchPointEntity) {
        this.id = touchPoint.id;
        this.order = touchPoint.order;
        this.goal = touchPoint.goal;
        this.status = touchPoint.status;
        this.note = touchPoint.note;
        this.meetingDate = touchPoint.meetingDate;
        this.review = touchPoint.review;
    }
}
