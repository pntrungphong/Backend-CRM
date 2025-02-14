'use strict';

import { ApiPropertyOptional } from '@nestjs/swagger';

import { AbstractDto } from '../../../../common/dto/AbstractDto';
import { TouchPointEntity } from '../../entity/Touchpoint/touchpoint.entity';
import { TaskDto } from '../task/TaskDto';
import { InfoFileTouchPointDto } from './InfoFileTouchPointDto';
import { InfoLeadTouchPointDto } from './InfoLeadTouchPointDto';

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
    review: string;

    @ApiPropertyOptional()
    lane: string;

    @ApiPropertyOptional()
    meetingDate: Date;

    @ApiPropertyOptional()
    actualDate: Date;

    @ApiPropertyOptional()
    createdBy: string;

    @ApiPropertyOptional()
    updatedBy: string;

    @ApiPropertyOptional({ type: [InfoLeadTouchPointDto] })
    lead: InfoLeadTouchPointDto;

    @ApiPropertyOptional({ type: [InfoFileTouchPointDto] })
    fileTouchPoint: InfoFileTouchPointDto[];

    @ApiPropertyOptional({ type: [TaskDto] })
    task: TaskDto[];

    constructor(touchPoint: TouchPointEntity) {
        super(touchPoint);
        this.order = touchPoint.order;
        this.goal = touchPoint.goal;
        this.status = touchPoint.status;
        this.note = touchPoint.note;
        this.meetingDate = touchPoint.meetingDate;
        this.createdBy = touchPoint.createdBy;
        this.updatedBy = touchPoint.updatedBy;
        this.lead = touchPoint.lead;
        this.fileTouchPoint = touchPoint.fileTouchPoint;
        this.task = touchPoint.task;
        this.review = touchPoint.review;
        this.actualDate = touchPoint.actualDate;
        this.lane = touchPoint.lane;
    }
}
