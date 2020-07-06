'use strict';

import {
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Query,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AuthGuard } from '../../guards/auth.guard';
import { RolesGuard } from '../../guards/roles.guard';
import { AuthUserInterceptor } from '../../interceptors/auth-user-interceptor.service';
import { TagDto } from './dto/TagDto';
import { TagsPageDto } from './dto/TagsPageDto';
import { TagService } from './tag.service';

@Controller('tag')
@ApiTags('tag')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(AuthUserInterceptor)
@ApiBearerAuth()
export class TagController {
    constructor(private _tagService: TagService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Get tags list',
        type: TagsPageDto,
    })
    getAll(@Query() tag: TagDto): Promise<TagsPageDto> {
        return this._tagService.getList(tag.tag);
    }
}
