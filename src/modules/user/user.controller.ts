'use strict';

import {
    Body,
    // Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Put,
    // Post,
    Query,
    UseGuards,
    UseInterceptors,
    ValidationPipe,
} from '@nestjs/common';
import {
    ApiBearerAuth,
    // ApiOkResponse,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';

import { RoleType } from '../../common/constants/role-type';
import { AuthUser } from '../../decorators/auth-user.decorator';
import { Roles } from '../../decorators/roles.decorator';
import { AuthGuard } from '../../guards/auth.guard';
import { RolesGuard } from '../../guards/roles.guard';
import { AuthUserInterceptor } from '../../interceptors/auth-user-interceptor.service';
import { UpdateUserDto } from './dto/UpdateUserDto';
import { UsersPageDto } from './dto/UsersPageDto';
import { UsersPageOptionsDto } from './dto/UsersPageOptionsDto';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';

@Controller('users')
@ApiTags('users')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(AuthUserInterceptor)
@ApiBearerAuth()
export class UserController {
    constructor(private _userService: UserService) { }

    @Get('admin')
    @Roles(RoleType.ADMIN)
    @HttpCode(HttpStatus.OK)
    admin(@AuthUser() user: UserEntity): string {
        return 'only for you admin: ' + user.firstName;
    }

    @Get('users')
    @Roles(RoleType.USER)
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Get users list',
        type: UsersPageDto,
    })
    getUsers(
        @Query(new ValidationPipe({ transform: true }))
        pageOptionsDto: UsersPageOptionsDto,
    ): Promise<UsersPageDto> {
        return this._userService.getUsers(pageOptionsDto);
    }

    @Put('password')
    @ApiResponse({
        type: UpdateUserDto,
        description: 'Successfully Updated',
    })
    async update(
        @Body() data: UpdateUserDto,
        @AuthUser() user: UserEntity,
    ): Promise<UpdateUserDto> {
        const updatedPassword = await this._userService.changePassword(
            data,
            user,
        );
        return updatedPassword.toDto() as UpdateUserDto;
    }
}
