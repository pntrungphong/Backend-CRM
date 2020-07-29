'use strict';

import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class NoteFileTouchPointDto {
    @IsString()
    @ApiProperty()
    note: string;
}
