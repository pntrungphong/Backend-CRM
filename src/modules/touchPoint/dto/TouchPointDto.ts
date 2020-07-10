'use strict';

import { ApiPropertyOptional } from '@nestjs/swagger';

import { AbstractDto } from '../../../common/dto/AbstractDto';

import { TouchPointEntity } from '../touchPoint.entity';
import { InfoLeadTouchPointDto } from './InfoLeadTouchPointDto';
import { NoteTouchPointUpdateDto } from '../NoteTouchPoint/dto/NoteUpdateDto';
import { NoteTouchPointEntity } from '../NoteTouchPoint/noteTouchPoint.entity';
export class TouchPointDto extends AbstractDto {
    @ApiPropertyOptional({type:[]})
    goal: string;
    @ApiPropertyOptional()
    rank: number;
    @ApiPropertyOptional()
    createdBy: string;
    @ApiPropertyOptional()
    meetingDate: Date;
    @ApiPropertyOptional()
    updatedBy: string;
    @ApiPropertyOptional({ type: [InfoLeadTouchPointDto] })
    lead: InfoLeadTouchPointDto;
    @ApiPropertyOptional({type:NoteTouchPointUpdateDto})
    note:NoteTouchPointEntity[];


    constructor(touchPoint: TouchPointEntity) {
        super(touchPoint);
        this.goal=touchPoint.goal;
        this.rank=touchPoint.rank;
        this.meetingDate=touchPoint.meetingDate;;
        this.createdBy=touchPoint.createdBy;
        this.updatedBy=touchPoint.updatedBy;
        this.lead=touchPoint.lead;
        this.note=touchPoint.note;
    }
}
