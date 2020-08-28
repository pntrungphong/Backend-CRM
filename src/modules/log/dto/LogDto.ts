'use strict';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString } from 'class-validator';

export class LogDto {
    @IsOptional()
    @ApiProperty()
    type: string;

    @IsOptional()
    @ApiProperty()
    entityType: string;

    @IsOptional()
    @ApiProperty()
    entityId: number;

    @IsOptional()
    @ApiProperty({ type: [] })
    beforeUpdate: string;

    @IsOptional()
    @ApiProperty({ type: [] })
    afterUpdate: string;

    @IsOptional()
    @ApiProperty({ type: [] })
    fieldChange: string;

    @IsOptional()
    @ApiProperty()
    createdBy: string;
}
