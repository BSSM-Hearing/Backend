import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { AlarmService } from '../service/alarm.service';
import { ApiTags, ApiOperation, ApiResponse, ApiCookieAuth } from '@nestjs/swagger/dist';
import * as ApiPath from '../../common/path/ApiPath'
import { GetUser } from 'src/auth/decorator/getUserDecorator';
import { UserDto } from 'src/auth/dtos/user.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { Alarm } from '../entities/alarm.entity';
import { CheckAlarmRq } from './rq/check-alarm.rq';

@Controller(ApiPath.ALARM)
@ApiTags('알림')
@ApiCookieAuth()
@UseGuards(JwtAuthGuard)
export class AlarmController {
    constructor(private readonly alarmService: AlarmService) { }

    @Post()
    @ApiOperation({ summary: "긴급 보호자 요청" })
    @ApiResponse({
        status: 200
    })
    create(
        @GetUser() user: UserDto,
    ) {
        return this.alarmService.create(user);
    }

    @Get()
    @ApiOperation({ summary: "내 알림 보기" })
    @ApiResponse({
        status: 200,
        type: [Alarm]
    })
    findAll(@GetUser() user: UserDto) {
        return this.alarmService.findAll(user);
    }

}
