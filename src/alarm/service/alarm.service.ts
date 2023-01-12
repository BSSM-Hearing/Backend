import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlarmRq } from '../controller/rq/create-alarm.rq';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from 'src/auth/dtos/user.dto';
import { Alarm } from '../entities/alarm.entity';
import { Repository } from 'typeorm';
import { plainToClass } from '@nestjs/class-transformer';
import { CheckAlarmRq } from '../controller/rq/check-alarm.rq';
import { User } from 'src/user/entities/user.entity';
import { UserRole } from 'src/common/enums/UserRole';

@Injectable()
export class AlarmService {
    constructor(
        @InjectRepository(Alarm) private alarmRepository: Repository<Alarm>,
        @InjectRepository(User) private userRepository: Repository<User>
    ) { }

    async create(user: UserDto, rq: CreateAlarmRq) {
        const { userId } = user;
        await this.alarmRepository.save(plainToClass(Alarm, {
            ...rq,
            userId: userId
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
        if (!alarm) throw new NotFoundException("알람이 존재하지 않습니다.");
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
