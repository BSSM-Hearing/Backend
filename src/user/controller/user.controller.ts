import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { CreateUserRq } from './rq/create-user.rq';
import * as ApiPath from '../../common/path/ApiPath'
import { ApiTags } from '@nestjs/swagger/dist';
import { ApiOperation } from '@nestjs/swagger/dist/decorators/api-operation.decorator';
import { ApiResponse } from '@nestjs/swagger/dist/decorators/api-response.decorator';

@Controller(ApiPath.USER)
@ApiTags('유저')
export class UserController {

    constructor(private readonly userService: UserService) { }

    @Post(ApiPath.USER_CREATE)
    @ApiOperation({ summary: "유저 생성" })
    @ApiResponse({
        status: 200
    })
    createUser(@Body() rq: CreateUserRq) {
        return this.userService.CreateUser(rq);
    }



}
