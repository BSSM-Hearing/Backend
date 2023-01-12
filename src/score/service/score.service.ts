import { plainToClass } from '@nestjs/class-transformer';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from 'src/auth/dtos/user.dto';
import { getTodayDate, getYesterdayDate } from 'src/common/utils';
import { LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { CreateScoreRq } from '../controller/rq/create-score.rq';
import { GetTodayScoreRs } from '../controller/rs/get-today-score.rs';
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

    async findTodayTopScore(user: UserDto) {
        const { userId } = user;
        const today = getTodayDate();
        const score = await this.scoreRepository.find({
            take: 1,
            where: {
                userId: userId,
                createdAt: MoreThanOrEqual(today)
            },
            order: {
                score: "DESC"
            },
        })
        const todayScore = score.length === 0 ? 0 : score[0].score;
        const yesterdayScore = await this.GetYesterdayScore(user, today);
        let scorePercent = "";
        if (yesterdayScore === 0) {
            scorePercent = '처음 하셨네요! 앞으로 꾸준히 해봐요';
        } else {
            scorePercent = ((todayScore / yesterdayScore) * 100).toString() + '%';
        }
        return plainToClass(GetTodayScoreRs, {
            todayScore: todayScore,
            dialogPercent: scorePercent
        });

    }

    async GetYesterdayScore(user: UserDto, today: Date) {
        const { userId } = user
        const yesterday = getYesterdayDate();
        const score = await this.scoreRepository.find({
            take: 1,
            where: {
                userId: userId,
                createdAt: MoreThanOrEqual(yesterday) && LessThanOrEqual(today)
            },
            order: {
                score: "DESC"
            },
        })
        const yesterdayScore = score.length === 0 ? 0 : score[0].score;
        return yesterdayScore;
    }

}
