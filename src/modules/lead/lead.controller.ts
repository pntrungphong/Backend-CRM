'use strict';
import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Post,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { AuthUser } from '../../decorators/auth-user.decorator';
import { AuthGuard } from '../../guards/auth.guard';
import { RolesGuard } from '../../guards/roles.guard';
import { AuthUserInterceptor } from '../../interceptors/auth-user-interceptor.service';
import { UserEntity } from '../../modules/user/user.entity';
import { LeadDto } from './dto/LeadDto';
import { LeadUpdateDto } from './dto/LeadUpdateDto';
import { LeadService } from './lead.service';

@Controller('lead')
@ApiTags('lead')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(AuthUserInterceptor)
@ApiBearerAuth()
export class LeadController {
    constructor(private _leadService: LeadService) {}

    // @Get('/:id')
    // @HttpCode(HttpStatus.OK)
    // async getCompanyById(@Param('id') id: string) {
    //     return this._leadService.findById(id);
    // }
    @Post()
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({ type: LeadUpdateDto, description: 'Successfully Created' })
    async createLead(
        @Body() data: LeadUpdateDto,
        @AuthUser() user: UserEntity,
    ): Promise<LeadDto> {
        const createLead = await this._leadService.create(user, data);
        return createLead.toDto() as LeadDto;
    }
}
