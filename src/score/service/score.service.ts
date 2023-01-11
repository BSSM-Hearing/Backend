import { plainToClass } from '@nestjs/class-transformer';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from 'src/auth/dtos/user.dto';
import { CreateUserRq } from 'src/user/controller/rq/create-user.rq';
import { Repository } from 'typeorm';
import { CreateScoreRq } from '../controller/rq/create-score.rq';
import { Score } from '../entities/score.entity';

@Injectable()
export class ScoreService {

  constructor(
    @InjectRepository(Score) private scoreRepository: Repository<Score>,
  ) { }

  async create(user: UserDto, rq: CreateScoreRq) {
    const { userId } = user;
    await this.scoreRepository.save(plainToClass(Score, {
      ...rq,
      userId: userId
    }));
  }

  findAll() {
    return `This action returns all score`;
  }

  findOne(id: number) {
    return `This action returns a #${id} score`;
  }

}
