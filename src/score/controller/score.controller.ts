import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { ScoreService } from '../service/score.service';
import * as ApiPath from '../../common/path/ApiPath'
import { CreateScoreRq } from './rq/create-score.rq';
import { ApiTags, ApiOperation, ApiResponse, ApiCookieAuth } from '@nestjs/swagger/dist';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { GetUser } from 'src/auth/decorator/getUserDecorator';
import { UserDto } from 'src/auth/dtos/user.dto';
import { Score } from '../entities/score.entity';

@Controller(ApiPath.SCORE)
@ApiTags('점수')
@ApiCookieAuth()
@UseGuards(JwtAuthGuard)
export class ScoreController {
    constructor(private readonly scoreService: ScoreService) { }

    @Post(ApiPath.SCORE_CREATE)
    @ApiOperation({ summary: "점수 업로드" })
    @ApiResponse({
        status: 200
    })
    create(
        @GetUser() user: UserDto,
        @Body() rq: CreateScoreRq
    ) {
        return this.scoreService.create(user, rq);
    }

    @Get(ApiPath.SCORE_ALL)
    @ApiOperation({ summary: "내 모든 점수 보기" })
    @ApiResponse({
        status: 200,
        type: [Score]
    })
    findAll(@GetUser() user: UserDto) {
        return this.scoreService.findAll(user);
    }

    @Get(ApiPath.SCORE_TODAY)
    @ApiOperation({ summary: "오늘 내 점수 보기" })
    @ApiResponse({
        status: 200,
        type: [Score]
    })
    findToday(@GetUser() user: UserDto) {
        return this.scoreService.findToday(user);
    }

}
