import { Controller, Get, Post, Body, UseGuards, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiCookieAuth } from '@nestjs/swagger/dist';
import * as ApiPath from '../../common/path/ApiPath'
import { GetUser } from 'src/auth/decorator/getUserDecorator';
import { UserDto } from 'src/auth/dtos/user.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { MqttService } from '../service/mqtt.service';

@Controller(ApiPath.MQTT)
@ApiTags('IOT')
export class MqttController {

    constructor(private readonly mqttService: MqttService) { }

    @Get()
    @ApiOperation({ summary: "MQTT 연결 및 값 받아오기" })
    @ApiResponse({
        status: 200,
    })
    getDialogByHash() {
        return this.mqttService.MqttConnect();
    }

    
}