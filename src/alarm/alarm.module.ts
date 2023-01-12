import { Module } from '@nestjs/common';
import { AlarmService } from './service/alarm.service';
import { AlarmController } from './controller/alarm.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Alarm } from './entities/alarm.entity';
import { AlarmGateway } from './alarm.gateway';

@Module({
  imports: [
    TypeOrmModule.forFeature([Alarm])
  ],
  controllers: [AlarmController],
  providers: [AlarmService, AlarmGateway]
})
export class AlarmModule { }
