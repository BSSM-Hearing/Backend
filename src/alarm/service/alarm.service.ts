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
    @InjectRepository(Alarm) private scoreRepository: Repository<Alarm>,
  ) { }

  async create(user: UserDto, rq: CreateAlarmRq) {
    const { userId } = user;
    await this.scoreRepository.save(plainToClass(Alarm, {
      ...rq,
      userId: userId
    }));
  }
  findAll() {
    return `This action returns all alarm`;
  }

  findOne(id: number) {
    return `This action returns a #${id} alarm`;
  }
}
