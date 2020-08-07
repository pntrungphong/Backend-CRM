'use strict';
import {
    Body,
    Controller,
    Param,
    Put,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { AuthGuard } from '../../../guards/auth.guard';
import { RolesGuard } from '../../../guards/roles.guard';
import { AuthUserInterceptor } from '../../../interceptors/auth-user-interceptor.service';
import { LinkTouchPointFileDto } from '../dto/fileTouchPoint/LinkFileDto';
import { NoteFileTouchPointDto } from '../dto/fileTouchPoint/NoteFileTouchPoint';
import { TouchPointFileService } from '../service/TouchPoint_file/fileTouchPoint.service';

@Controller('touchPointFile')
@ApiTags('touchPointFile')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(AuthUserInterceptor)
@ApiBearerAuth()
export class FileTouchPointController {
    constructor(private _touchPointFileService: TouchPointFileService) {}
    @Put(':id')
    @ApiOkResponse({
        type: LinkTouchPointFileDto,
        description: 'Successfully Updated',
    })
    async update(
        @Param('id') id: number,
        @Body() updateDto: NoteFileTouchPointDto,
    ): Promise<NoteFileTouchPointDto> {
        const updatedLead = await this._touchPointFileService.updateNote(
            updateDto,
            id,
        );
        return updatedLead as NoteFileTouchPointDto;
    }
}
