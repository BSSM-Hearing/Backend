import { Injectable } from '@nestjs/common';
import { CreateAlarmRq } from '../controller/rq/create-alarm.rq';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from 'src/auth/dtos/user.dto';
import { Alarm } from '../entities/alarm.entity';
import { Repository } from 'typeorm';
import { plainToClass } from '@nestjs/class-transformer';

@Injectable()
export class AlarmService {
  constructor(
    @InjectRepository(Alarm) private alarmRepository: Repository<Alarm>,
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
        userId: userId
      }
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} alarm`;
  }
}
