'use strict';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsArray } from 'class-validator';
import { NoteTouchPointUpdateDto } from '../NoteTouchPoint/dto/NoteUpdateDto';
export class TouchPointUpdateDto  {
    @IsArray()
    @ApiPropertyOptional({type:[]})
    goal: string;

    @IsOptional()
    @ApiPropertyOptional()
    rank: number;
    @IsOptional()
    @ApiPropertyOptional()
    idLead: number;
    @IsOptional()
    @ApiPropertyOptional()
    meetingDate:Date;
    @IsArray()
    @ApiPropertyOptional({ type: [NoteTouchPointUpdateDto] })
    note: NoteTouchPointUpdateDto[];
    
}
