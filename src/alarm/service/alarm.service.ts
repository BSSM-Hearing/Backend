import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from 'src/auth/dtos/user.dto';
import { Alarm } from '../entities/alarm.entity';
import { Repository } from 'typeorm';
import { plainToClass } from '@nestjs/class-transformer';
import { CheckAlarmRq } from '../controller/rq/check-alarm.rq';
import { UserRole } from 'src/common/enums/UserRole';
import * as ApiException from "src/common/exceptions/ApiException";

@Injectable()
export class AlarmService {
    constructor(
        @InjectRepository(Alarm) private alarmRepository: Repository<Alarm>,
    ) { }

    async create(user: UserDto) {
        const { userId, parentId } = user;
        if (!parentId) throw new NotFoundException(ApiException.NOT_FOUND_PARENT);
        await this.alarmRepository.save(plainToClass(Alarm, {
            userId: userId,
            parentId: parentId
        }));
    }

    async findAll(user: UserDto) {
        const { userId } = user;
        return await this.alarmRepository.find({
            where: {
                parentId: userId
            }
        });
    }

    async checkAlarm(rq: CheckAlarmRq) {
        const { alarmId } = rq;
        const alarm = await this.alarmRepository.findOneBy({
            alarmId: alarmId
        })
        if (!alarm) throw new NotFoundException(ApiException.NOT_FOUND_ALARM);
        const parentId = alarm.parentId;
        return parentId;
    }

    async getParentId(userInfo: UserDto) {
        const { userId, parentId, role } = userInfo;
        switch (role) {
            case UserRole.DISABLED:
                if (!parentId) return 0;
                return parentId;
            case UserRole.GUARDIAN:
                return userId;
        }
    }

}
