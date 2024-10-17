import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { BaseController } from 'src/base/base.controller';
import { UsersService } from './users.service';
import { UserDto } from 'src/model/dto/user.dto';
import { UserEntity } from 'src/model/entity/user.entity';
import { CoreService } from 'src/core/core.service';
import { EntityType, ModelType } from 'src/common/reflect.metadata';


@ApiTags('User')
@Controller('api/user')
export class UsersController extends BaseController<UserEntity, Prisma.UserCreateInput, UserDto> {
    @EntityType(UserEntity)
    entity: UserEntity;

    @ModelType(UserDto)
    model: UserDto;
    constructor(private usersService: UsersService, coreSevice: CoreService){
        super("users",coreSevice,usersService);
        
    }
}
