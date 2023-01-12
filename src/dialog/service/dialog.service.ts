import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from 'src/auth/dtos/user.dto';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { plainToClass } from '@nestjs/class-transformer';
import { Dialog } from '../entities/dialog.entity';
import { SendDialogRq } from '../controller/rq/send-dialog.rq';
import { getTodayDate } from 'src/common/utils';

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
        return await this.dialogRepository.count({
            where: {
                userId: userId,
                createdAt: MoreThanOrEqual(today)
            }
        })        
    }
}
