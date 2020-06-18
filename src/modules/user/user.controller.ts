'use strict';

import {
    // Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
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
// import { UserRegisterDto } from '../auth/dto/UserRegisterDto';
// import { UserDto } from './dto/UserDto';
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
    constructor(private _userService: UserService) {}

    @Get('admin')
    @Roles(RoleType.USER)
    @HttpCode(HttpStatus.OK)
    admin(@AuthUser() user: UserEntity): string {
        return 'only for you admin: ' + user.firstName;
    }

    @Get('users')
    @Roles(RoleType.ADMIN)
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

    // @Post('users')
    // @HttpCode(HttpStatus.OK)
    // @ApiOkResponse({ type: UserDto, description: 'Successfully Created' })
    // async userCreate(
    //     @Body() userRegisterDto: UserRegisterDto,
    // ): Promise<UserDto> {
    //     const createdUser = await this._userService.createUser(userRegisterDto);
    //     return createdUser.toDto();
    // }
    // @Put(':id')
    // @Roles(RoleType.USER)
    // @HttpCode(HttpStatus.OK)
    // @ApiOkResponse({
    //     description: 'Update infomation user',
    //     type: UserUpdateDto,
    // })
    // async updateUser(@Param('id') userId: string, @Body() userData: UserUpdateDto) {
    //     console.log("get there")
    //     return await this._userService.updateUser(userId, userData);
    // }
}
