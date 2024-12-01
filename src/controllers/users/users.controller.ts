import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Prisma, Role } from '@prisma/client';
import { BaseController } from 'src/base/base.controller';
import { UsersService } from './users.service';
import { UserDto } from 'src/model/dto/user.dto';
import { UserEntity } from 'src/model/entity/user.entity';
import { CoreService } from 'src/core/core.service';
import { EntityType, ModelType } from 'src/common/reflect.metadata';
import { AuthGuard } from 'src/core/auth.guard';
import { Roles } from 'src/utils/roles.decorator';
import { ServiceResponse } from 'src/model/response/service.response';
import { PageRequest } from 'src/model/request/page.request';


@ApiTags('User')
@Controller('api/user')
@UseGuards(AuthGuard)
export class UsersController extends BaseController<UserEntity, Prisma.UserCreateInput> {
    @EntityType(UserEntity)
    entity: UserEntity;

    @ModelType(UserDto)
    model: UserDto;
    constructor(private usersService: UsersService, coreSevice: CoreService){
        super("users",coreSevice,usersService);
    }

    @Post("test")
    @ApiBody({type: UserDto})
    async apiTest(@Body() param: UserDto){
        return null;
    }

    @Get("currentUser")
    async getCurrentUser(){
        return this.usersService.getCurrentUser();
    }

    @Post("notification")
    async getNotification(@Body() param: PageRequest){
        return ServiceResponse.onSuccess(await this.usersService.getNotification(param));
    }

}
