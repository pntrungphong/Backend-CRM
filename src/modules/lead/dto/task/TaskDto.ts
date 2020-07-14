'use strict';

import { ApiPropertyOptional } from '@nestjs/swagger';

import { AbstractDto } from '../../../../common/dto/AbstractDto';
export class TaskDto extends AbstractDto {
    @ApiPropertyOptional()
    taskname: string;
    @ApiPropertyOptional()
    type: string;
    @ApiPropertyOptional()
    userId: string;
    @ApiPropertyOptional()
    dueDate: Date;
}
