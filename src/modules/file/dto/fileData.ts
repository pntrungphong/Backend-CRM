'use strict';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString } from 'class-validator';
export class FileData {
    @IsString()
    @ApiPropertyOptional()
    id: string;
}
