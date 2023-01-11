import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { ScoreService } from '../service/score.service';
import * as ApiPath from '../../common/path/ApiPath'
import { CreateScoreRq } from './rq/create-score.rq';
import { ApiTags, ApiOperation, ApiResponse, ApiCookieAuth } from '@nestjs/swagger/dist';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { GetUser } from 'src/auth/decorator/getUserDecorator';
import { UserDto } from 'src/auth/dtos/user.dto';

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

  @Get()
  findAll() {
    return this.scoreService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.scoreService.findOne(+id);
  }

}
