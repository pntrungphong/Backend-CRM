'use strict';

import { ApiPropertyOptional } from '@nestjs/swagger';

import { AbstractDto } from '../../../common/dto/AbstractDto';
import { TouchPointEntity } from '../touchpoint.entity';

export class TouchPointDto extends AbstractDto {
    @ApiPropertyOptional()
    order: number;

    @ApiPropertyOptional()
    goal: string;

    @ApiPropertyOptional()
    status: string;

    @ApiPropertyOptional()
    note: string;

    @ApiPropertyOptional()
    meetingDate: Date;

    @ApiPropertyOptional()
    createdBy: string;

    @ApiPropertyOptional()
    updatedBy: string;
    @ApiPropertyOptional()
    idLead: number;

    constructor(touchPoint: TouchPointEntity) {
        super(touchPoint);
        this.order = touchPoint.order;
        this.goal = touchPoint.goal;
        this.status = touchPoint.status;
        this.note = touchPoint.note;
        this.meetingDate = touchPoint.meetingDate;
        this.createdBy = touchPoint.createdBy;
        this.updatedBy = touchPoint.updatedBy;
        this.idLead = touchPoint.idLead;
    }
}
