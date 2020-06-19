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
    Post, 
    Body,
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
import { CompanysPageDto } from './dto/CompanysPageDto';
import { CompanysPageOptionsDto } from './dto/CompanysPageOptionsDto';
import { CompanyEntity } from './company.entity';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/CreateCompanyDto';

@Controller('companys')
@ApiTags('companys')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(AuthUserInterceptor)
@ApiBearerAuth()
export class CompanyController {
    constructor(private readonly _companyService: CompanyService) {}

    
    @Post()
    addCompany(
      // @Body('name') prodName: string,
      // @Body('url') prodID: string
      @Body() CreateCompanyDto : CreateCompanyDto
    ) {
      const generatedName = this._companyService.insertCompany(
        CreateCompanyDto.name,
        CreateCompanyDto.url,
      );
      return { name: generatedName };
    }

    @Get()
    getAllProducts() {
        return this._companyService.getComapnys();
    }

    @Get()
    getCompanys() {
        return this._companyService.getCompany();
    }


    // @Get('users')
    // @Roles(RoleType.ADMIN)
    // @HttpCode(HttpStatus.OK)
    // @ApiResponse({
    //     status: HttpStatus.OK,
    //     description: 'Get users list',
    //     type: CompanysPageDto,
    // })

    // @Get()
    // getCompanys(
    //     @Query(new ValidationPipe({ transform: true }))
    //     pageOptionsDto: CompanysPageOptionsDto,
    // ): Promise<CompanysPageDto> {
    //     return this._companyService.getCompanys(pageOptionsDto);
    // }

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
