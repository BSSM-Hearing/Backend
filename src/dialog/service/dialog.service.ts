import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from 'src/auth/dtos/user.dto';
import { Between, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { plainToClass } from '@nestjs/class-transformer';
import { Dialog } from '../entities/dialog.entity';
import { SendDialogRq } from '../controller/rq/send-dialog.rq';
import { getTodayDate, getYesterdayDate } from 'src/common/utils';
import { GetTodayDialogRs } from '../controller/rs/get-today-dialog-count.rs';

@Injectable()
export class DialogService {
    constructor(
        @InjectRepository(Dialog) private dialogRepository: Repository<Dialog>,
    ) { }

    async SendDialog(user: UserDto, rq: SendDialogRq) {
        const { userId } = user;
        await this.dialogRepository.save(plainToClass(Dialog, {
            ...rq,
            userId: userId
        }));
    }

    async GetDialogByHash(user: UserDto, hash: string) {
        const { userId } = user;
        const hashInt = Number(hash);
        return await this.dialogRepository.find({
            where: {
                hash: hashInt,
                userId: userId
            }
        })   
    }

    async GetTodayDialogCount(user: UserDto) {
        const { userId } = user;
        const today = getTodayDate();
        const todayCnt = await this.dialogRepository.count({
            where: {
                userId: userId,
                createdAt: MoreThanOrEqual(today)
            }
        });
        const yesterdayCnt = await this.GetYesterdayDialogCount(user, today);
        let dialogPercent = "";
        if (yesterdayCnt === 0) {
            dialogPercent = '처음 하셨네요! 앞으로 꾸준히 해봐요';
        } else {
            dialogPercent = ((todayCnt / yesterdayCnt) * 100).toString() + '%';
        } 
        return plainToClass(GetTodayDialogRs, {
            todayCnt: todayCnt,
            dialogPercent: dialogPercent
        });
    }

    async GetYesterdayDialogCount(user: UserDto, today: Date) {
        const { userId } = user
        const yesterday = getYesterdayDate();
        console.log(yesterday)
        return await this.dialogRepository.count({
            where: {
                userId: userId,
                createdAt: MoreThanOrEqual(yesterday) && LessThanOrEqual(today),
            }
        })  
    }
}
