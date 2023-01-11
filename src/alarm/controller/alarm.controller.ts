import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { AlarmService } from '../service/alarm.service';
import { CreateAlarmRq } from './rq/create-alarm.rq';
import { ApiTags, ApiOperation, ApiResponse, ApiCookieAuth } from '@nestjs/swagger/dist';
import * as ApiPath from '../../common/path/ApiPath'
import { GetUser } from 'src/auth/decorator/getUserDecorator';
import { UserDto } from 'src/auth/dtos/user.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';

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
    @Body() rq: CreateAlarmRq
  ) {
    return this.alarmService.create(user, rq);
  }

  @Get()
  findAll() {
    return this.alarmService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.alarmService.findOne(+id);
  }
}
