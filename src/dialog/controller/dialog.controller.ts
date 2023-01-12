import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiCookieAuth } from '@nestjs/swagger/dist';
import * as ApiPath from '../../common/path/ApiPath'
import { GetUser } from 'src/auth/decorator/getUserDecorator';
import { UserDto } from 'src/auth/dtos/user.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { DialogService } from '../service/dialog.service';
import { SendDialogRq } from './rq/send-dialog.rq';

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

}
