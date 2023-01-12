import { plainToClass } from '@nestjs/class-transformer';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from 'src/auth/dtos/user.dto';
import { getTodayDate } from 'src/common/utils/getTodayDate';
import { CreateUserRq } from 'src/user/controller/rq/create-user.rq';
import { MoreThan, MoreThanOrEqual, Repository } from 'typeorm';
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

    async findAll(user: UserDto) {
        const { userId } = user;
        return await this.scoreRepository.find({
            where: {
                userId: userId
            }
        })
    }

    async findToday(user: UserDto) {
        const { userId } = user;
        const today = getTodayDate();
        console.log(today);
        return await this.scoreRepository.find({
            where: {
                userId: userId,
                createdAt: MoreThanOrEqual(today)
            }
        })
    }

}
