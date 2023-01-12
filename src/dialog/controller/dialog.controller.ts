import { Controller, Get, Post, Body, UseGuards, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiCookieAuth } from '@nestjs/swagger/dist';
import * as ApiPath from '../../common/path/ApiPath'
import { GetUser } from 'src/auth/decorator/getUserDecorator';
import { UserDto } from 'src/auth/dtos/user.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { DialogService } from '../service/dialog.service';
import { SendDialogRq } from './rq/send-dialog.rq';
import { Dialog } from '../entities/dialog.entity';
import { GetTodayDialogRs } from './rs/get-today-dialog-count.rs';

@Controller(ApiPath.DIALOG)
@ApiTags('대화')
@ApiCookieAuth()
@UseGuards(JwtAuthGuard)
export class DialogController {

    constructor(private readonly dialogService: DialogService) { }

    @Post()
    @ApiOperation({ summary: "대화 보내기" })
    @ApiResponse({
        status: 200
    })
    sendDialog(
        @GetUser() user: UserDto,
        @Body() rq: SendDialogRq
    ) {
        return this.dialogService.SendDialog(user, rq);
    }

    @Get(ApiPath.DIALOG_GET_BY_HASH)
    @ApiOperation({ summary: "같은 해시값 대화 가져오기" })
    @ApiResponse({
        status: 200,
        type: [Dialog]
    })
    getDialogByHash(
        @GetUser() user: UserDto,
        @Param('hash') hash: string
    ) {
        return this.dialogService.GetDialogByHash(user, hash);
    }

    @Get(ApiPath.DIALOG_TODAY)
    @ApiOperation({ summary: "오늘의 대화 횟수" })
    @ApiResponse({
        status: 200,
        type: GetTodayDialogRs
    }) 
    getTodayDialogCount(
        @GetUser() user: UserDto,
    ) {
        return this.dialogService.GetTodayDialogCount(user);
    }

}
